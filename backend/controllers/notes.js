const notesRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Note = require("../models/note");
const User = require("../models/user");

notesRouter.get("/", async (req, res) => {
	const notes = await Note.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	res.json(notes);
});

notesRouter.get("/:id", async (req, res, next) => {
	const note = await Note.findById(req.params.id);
	if (note) {
		res.json(note);
	} else {
		res.status(404).end();
	}
});

notesRouter.delete("/:id", async (req, res, next) => {
	await Note.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

// const generateId = () => {
// 	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
// 	return maxId + 1;
// };

const getTokenFrom = (req) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	} else if (authorization && authorization.startsWith("bearer ")) {
		return authorization.replace("bearer ", "");
	}
	return null;
};

notesRouter.post("/", async (req, res, next) => {
	const body = req.body;
	const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
	if (!decodedToken.id) {
		return res.status(401).json({ error: "invalid token" });
	}

	const user = await User.findById(decodedToken.id);

	const note = new Note({
		content: body.content,
		important: body.important || false,
		user: user.id,
	});

	const savedNote = await note.save();
	user.notes = user.notes.concat(savedNote._id);
	await user.save();

	res.status(201).json(savedNote);
});

notesRouter.put("/:id", (req, res, next) => {
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
