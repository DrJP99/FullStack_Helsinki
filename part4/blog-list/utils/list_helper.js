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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
