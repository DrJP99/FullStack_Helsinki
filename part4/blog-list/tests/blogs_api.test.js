const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

test("all blogs are returned and in JSON format", async () => {
	const res = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);

	expect(res.body).toHaveLength(helper.initialBlogs.length);
});

test("blogs have identifier id and NOT _id", async () => {
	const blogs = await helper.blogsInDb();

	expect(blogs[0]._id).not.toBeDefined();
	expect(blogs[0].id).toBeDefined();
});

test("blogs are created correctly", async () => {
	const new_blog = {
		title: "This is a new blog for testing",
		author: "JP Dixon",
		url: "http://www.jp-dixon.com/my-new-blog",
		likes: 69,
	};

	await api
		.post("/api/blogs")
		.send(new_blog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

	const contents = blogsAtEnd.map((b) => b.title);
	expect(contents).toContain("This is a new blog for testing");
});

test("blogs created without likes defined default to 0", async () => {
	const new_blog = {
		title: "This is a blog post wihtout likes",
		author: "JP Dixon",
		url: "http://www.jp-dixon/blog-test-without-likes",
	};

	const res = await api
		.post("/api/blogs")
		.send(new_blog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	expect(res.body.likes).toBe(0);
});

test("blogs without title or url recieve a status code 400", async () => {
	const new_blog = {
		author: "JP Dixon",
	};

	const res = await api.post("/api/blogs").send(new_blog).expect(400);
});

afterAll(async () => {
	await mongoose.connection.close();
});

test("delete a blog by id", async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToDelete = blogsAtStart[0];

	await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

	const blogsAtEnd = await helper.blogsInDb();
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

	const titles = blogsAtEnd.map((blog) => blog.title);
	expect(titles).not.toContain(blogToDelete.title);
});

test("update a blog by id", async () => {
	const blogsAtStart = await helper.blogsInDb();
	const blogToUpdate = blogsAtStart[0];

	const upadtedBlog = {
		title: blogToUpdate.title,
		author: blogToUpdate.author,
		url: blogToUpdate.url,
		likes: blogToUpdate.likes + 1,
	};

	const res = await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(upadtedBlog)
		.expect(200);

	expect(res.body.likes).toBe(blogToUpdate.likes + 1);
});
