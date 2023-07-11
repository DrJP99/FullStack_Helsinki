const Blog = ({ blog }) => {
	return (
		<div>
			{blog.url}
			<br />
			{blog.likes} <button>like</button> <br />
			{blog.user.name} <br />
		</div>
	)
}

export default Blog
