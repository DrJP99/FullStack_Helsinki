const { model } = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676232f17f9",
		title: "On Fairy Stories",
		author: "J.R.R. Tolkien",
		url: "https://www.excellence-in-literature.com/on-fairy-stories-by-tolkien/",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676232f17d0",
		title: "What Is To Be Done?",
		author: "Vladimir I. Lenin",
		url: "https://www.marxists.org/archive/lenin/works/1901/witbd/",
		likes: 15,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a696342f17a0",
		title: "Imperialism, the Highest Stage of Capitalism?",
		author: "Vladimir I. Lenin",
		url: "https://www.marxists.org/archive/lenin/works/1916/imp-hsc/",
		likes: 11,
		__v: 0,
	},
];

const initialUsers = [
	{
		username: "root",
		name: "Superuser",
		password: "abc123",
	},
	{
		username: "marx83",
		name: "Karl Marx",
		password: "pr0l3t4r14t_L0v3r",
	},
];

const nonExistingId = async () => {
	const blog = new Blog({
		title: "sometitle",
		author: "willdelete",
		url: "delete",
		likes: 0,
	});
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	initialUsers,
	usersInDb,
};
