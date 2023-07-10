const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
];

const listWithManyBlogs = [
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
];

const listWithZeroBlogs = [];

describe("total likes", () => {
	test("when list has one big blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("when list has many big blogs, equals the sum of likes", () => {
		const result = listHelper.totalLikes(listWithManyBlogs);
		expect(result).toBe(30);
	});

	test("when list has zero blogs, equals zero", () => {
		const result = listHelper.totalLikes(listWithZeroBlogs);
		expect(result).toBe(0);
	});
});
