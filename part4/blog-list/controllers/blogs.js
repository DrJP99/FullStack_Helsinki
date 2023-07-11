const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
	const { title, author, url, likes } = request.body;

	const users = await User.find({});
	const user = users[0];

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

	response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res, next) => {
	await Blog.findByIdAndDelete(req.params.id);
	res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
	const { title, author, url, likes } = req.body;

	const updatedBlog = await Blog.findByIdAndUpdate(
		req.params.id,
		{ title, author, url, likes },
		{ new: true, runValidators: "query" }
	);
	res.json(updatedBlog);
});

module.exports = blogsRouter;
