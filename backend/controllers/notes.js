const notesRouter = require("express").Router();
const Note = require("../models/note");

app.get("/", (req, res) => {
	Note.find({}).then((notes) => {
		res.json(notes);
	});
});

app.get("/:id", (req, res, next) => {
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

app.delete("/:id", (req, res, next) => {
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

app.post("/", (req, res, next) => {
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

app.put("/:id", (req, res, next) => {
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

module.exports = notesRouter;
