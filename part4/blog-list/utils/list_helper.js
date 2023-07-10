const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	let sum = 0;
	blogs.forEach((blog) => {
		sum += blog.likes;
	});
	return sum;
};

const favoriteBlog = (blogs) => {
	let favorite = null;
	let favorite_likes = 0;

	blogs.forEach((blog) => {
		if (blog.likes > favorite_likes) {
			favorite = blog;
			favorite_likes = blog.likes;
		}
	});

	return favorite;
};

const mostBlogs = (blogs) => {
	//returns author with most blogs
	let authors = {};
	let most_blogs = { author: "", blogs: 0 };

	blogs.forEach((blog) => {
		if (!(blog.author in authors)) {
			authors[blog.author] = Number(0);
		}
		authors[blog.author] += 1;

		if (authors[blog.author] > most_blogs.blogs) {
			most_blogs.author = blog.author;
			most_blogs.blogs = authors[blog.author];
		}
	});

	return most_blogs;
};

const mostLikes = (blogs) => {
	//returns authos with most likes in their blogs
	let authors = {};
	let most_likes = { author: "", likes: 0 };

	blogs.forEach((blog) => {
		if (!(blog.author in authors)) {
			authors[blog.author] = Number(0);
		}
		authors[blog.author] += blog.likes;

		if (authors[blog.author] > most_likes.likes) {
			most_likes.author = blog.author;
			most_likes.likes = authors[blog.author];
		}
	});

	return most_likes;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
