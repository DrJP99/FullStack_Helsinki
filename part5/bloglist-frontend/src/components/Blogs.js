import Blog from './Blog'
import Togglable from './Togglable'

const Blogs = ({ blogs, handleLike }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	return (
		<div>
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<Togglable
						buttonLabel='view'
						before={blog.title + ' ' + blog.author}
					>
						<Blog blog={blog} handleLike={handleLike} />
					</Togglable>
				</div>
			))}
		</div>
	)
}

export default Blogs
