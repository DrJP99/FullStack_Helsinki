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
	{
		_id: "5a422aa71b54a696342f17a0",
		title: "Imperialism, the Highest Stage of Capitalism?",
		author: "Vladimir I. Lenin",
		url: "https://www.marxists.org/archive/lenin/works/1916/imp-hsc/",
		likes: 11,
		__v: 0,
	},
];

const listWithZeroBlogs = [];

describe("Favorite Author", () => {
	test("list with one blog returns blog's author and likes", () => {
		result = listHelper.mostLikes(listWithOneBlog);
		expect(result).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 5,
		});
	});

	test("list with many blogs returns author with most likes and the sum of likes", () => {
		result = listHelper.mostLikes(listWithManyBlogs);
		expect(result).toEqual({
			author: "Vladimir I. Lenin",
			likes: 26,
		});
	});

	test("list with zero blogs returns empty author and 0 likes", () => {
		result = listHelper.mostLikes(listWithZeroBlogs);
		expect(result).toEqual({
			author: "",
			likes: 0,
		});
	});
});
