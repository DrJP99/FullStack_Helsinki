const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);

	await User.deleteMany({});

	const userObjects = helper.initialUsers.map((u) => new User(u));
	const promiseUsers = userObjects.map((u) => u.save());
	await Promise.all(promiseUsers);
});

describe("get JSON", () => {
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
});

describe("blog creation", () => {
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
});

describe("delete blog", () => {
	test("delete a blog by id", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

		const titles = blogsAtEnd.map((blog) => blog.title);
		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe("update blog", () => {
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
});

describe("create users", () => {
	test("create valid user", async () => {
		const usersAtStart = await helper.usersInDb();

		const validUser = {
			username: "admin",
			name: "Admi Nname",
			password: "abc123",
		};

		const res = await api
			.post("/api/users")
			.send(validUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const new_user = res.body;
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
		const usersArray = (await usersAtEnd).map((u) => u.username);
		expect(usersArray).toContain(new_user.username);
	});

	test("user without username and password fails", async () => {
		const usersAtStart = await helper.usersInDb();
		const invalidUser = {
			name: "Jon Snow",
		};

		await api.post("/api/users").send(invalidUser).expect(400);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test("user with password shorter than 3 chars fails", async () => {
		const usersAtStart = await helper.usersInDb();

		const invalidUser = {
			username: "jsnow",
			name: "Jon Snow",
			password: "a",
		};

		await api.post("/api/users").send(invalidUser).expect(400);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test("user with a repeating username fails", async () => {
		const usersAtStart = await helper.usersInDb();

		const invalidUser = {
			username: "marx83",
			name: "Alfred Marx",
			password: "validpassword",
		};

		await api.post("/api/users").send(invalidUser).expect(400);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
