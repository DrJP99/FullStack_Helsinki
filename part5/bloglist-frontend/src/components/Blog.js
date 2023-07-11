const Blog = ({ blog, handleLike }) => {
	return (
		<div>
			{blog.url}
			<br />
			{blog.likes} <button onClick={() => handleLike(blog)}>like</button>{' '}
			<br />
			{blog.user.name} <br />
		</div>
	)
}

export default Blog
