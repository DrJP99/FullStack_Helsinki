const Blog = ({ blog, handleLike, handleDelete }) => {
	const delete_blog = () => {
		const loggedJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (!loggedJSON) {
			return
		}
		const user_info = JSON.parse(loggedJSON)

		if (blog.user.username === user_info.username) {
			return <button onClick={() => handleDelete(blog)}>delete</button>
		}
	}

	return (
		<div>
			{blog.url}
			<br />
			{blog.likes} <button onClick={() => handleLike(blog)}>like</button>{' '}
			<br />
			{blog.user.name} <br />
			{delete_blog()}
		</div>
	)
}

export default Blog
