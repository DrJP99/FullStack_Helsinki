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
	const decodedToken = jwt.verify(req.token, process.env.SECRET);

	if (!decodedToken.id) {
		return res.status(401).json({ error: "invalid token" });
	}

	const user = await User.findById(decodedToken.id);

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
	const decodedToken = jwt.verify(req.token, process.env.SECRET);

	const old_blog = await Blog.findById(req.params.id);

	if (!decodedToken.id || decodedToken.id !== old_blog.user.toString()) {
		return res.status(401).json({ error: "invalid token" });
	}

	await Blog.findByIdAndDelete(req.params.id);
	res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
	const { title, author, url, likes } = req.body;
	const decodedToken = jwt.verify(req.token, process.env.SECRET);

	const old_blog = await Blog.findById(req.params.id);

	if (!decodedToken.id || decodedToken.id !== old_blog.user.toString()) {
		return res.status(401).json({ error: "invalid token" });
	}

	const updatedBlog = await Blog.findByIdAndUpdate(
		req.params.id,
		{ title, author, url, likes },
		{ new: true, runValidators: "query" }
	);
	console.log(updatedBlog);
	res.json(updatedBlog);
});

module.exports = blogsRouter;
