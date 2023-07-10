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

afterAll(async () => {
	await mongoose.connection.close();
});
