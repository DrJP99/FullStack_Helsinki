const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (req, res) => {
	const notes = await Note.find({});
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

notesRouter.post("/", async (req, res, next) => {
	const body = req.body;

	const note = new Note({
		content: body.content,
		important: body.important || false,
	});

	const savedNote = await note.save();
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
