const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.static("build"));
app.use(cors());

app.use(express.json());

const requestLogger = (req, res, next) => {
	console.log("Method: ", req.method);
	console.log("Path: ", req.path);
	console.log("Body: ", req.body);
	console.log("---");

	next();
};
app.use(requestLogger);

const Note = require("./models/note");

let notes = [
	{ id: 1, content: "HTML is easy", important: true },
	{ id: 2, content: "Browser can execute only JavaScript", important: false },
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true,
	},
];

app.get("/api/notes", (req, res) => {
	Note.find({}).then((notes) => {
		res.json(notes);
	});
});

app.get("/api/notes/:id", (req, res, next) => {
	Note.findById(req.params.id)
		.then((note) => {
			if (note) {
				res.json(note);
			} else {
				res.status(404).end();
			}
		})
		.catch((e) => {
			next(e);
		});
});

app.delete("/api/notes/:id", (req, res, next) => {
	Note.findByIdAndRemove(req.params.id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((e) => next(e));
});

// const generateId = () => {
// 	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
// 	return maxId + 1;
// };

app.post("/api/notes", (req, res, next) => {
	const body = req.body;

	// if (!body.content) {
	// 	return res.status(400).json({
	// 		error: "content missing",
	// 	});
	// }

	const note = new Note({
		content: body.content,
		important: body.important || false,
	});

	note.save()
		.then((savedNote) => {
			res.json(savedNote);
		})
		.catch((e) => next(e));
});

app.put("/api/notes/:id", (req, res, next) => {
	const { content, important } = req.body;

	Note.findByIdAndUpdate(
		req.params.id,
		{ content, important },
		{ new: true, runValidators: "query" }
	)
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((e) => next(e));
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformed id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
