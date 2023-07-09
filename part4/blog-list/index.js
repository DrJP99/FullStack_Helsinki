const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose
	.connect(mongoUrl)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((e) => {
		console.log("Could not connect to MongoDB:", e);
	});

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

app.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

app.post("/api/blogs", (request, response) => {
	const { title, author, url, likes } = request.body;
	// console.log(request.body);
	const blog = new Blog({
		title: title,
		author: author,
		url: url,
		likes: likes,
	});

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
