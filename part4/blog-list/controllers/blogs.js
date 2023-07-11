const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res, next) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
	const { title, author, url, likes } = req.body;

	const user = req.user;

	const blog = new Blog({
		title: title,
		author: author,
		url: url,
		user: user.id,
		likes: likes || 0,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res, next) => {
	const user = req.user;

	const old_blog = await Blog.findById(req.params.id);

	if (user._id.toString() !== old_blog.user.toString()) {
		return res.status(401).json({ error: "invalid token" });
	}

	await Blog.findByIdAndDelete(req.params.id);
	res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
	const { title, author, url, likes } = req.body;
	const user = req.user;

	const old_blog = await Blog.findById(req.params.id);

	if (user._id.toString() !== old_blog.user.toString()) {
		return res.status(401).json({ error: "invalid token" });
	}

	const updatedBlog = await Blog.findByIdAndUpdate(
		req.params.id,
		{ title, author, url, likes },
		{ new: true, runValidators: "query" }
	);

	res.json(updatedBlog);
});

module.exports = blogsRouter;
