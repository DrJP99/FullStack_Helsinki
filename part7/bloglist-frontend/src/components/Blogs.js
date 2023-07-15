import { useContext, useRef } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import Blog from './Blog'
import Togglable from './Togglable'
import { del, getAll, update } from '../services/blogs'
import NotificationContext from '../reducers/notification'
import UserContext from '../reducers/user'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
	const newBlogRef = useRef()
	const queryClient = useQueryClient()
	const [notification, notificationDispatch] = useContext(NotificationContext)
	const [user, userDispatch] = useContext(UserContext)

	const sort_blogs = () => {
		blogs.sort((a, b) => {
			return b.likes - a.likes
		})
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}
	sort_blogs()

	const createNewForm = () => (
		<Togglable buttonLabel='new' ref={newBlogRef}>
			<BlogForm />
		</Togglable>
	)

	return (
		<div>
			{user ? createNewForm() : null}
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<Link to={`/blogs/${blog.id}`} key={blog.id}>
						{blog.title} by {blog.author}
					</Link>
					{/* <Togglable
						buttonLabel='view'
						before={blog.title + ' ' + blog.author}
					>
						<Blog
							blog={blog}
							handleLike={handleLike}
							handleDelete={handleDelete}
						/>
					</Togglable> */}
				</div>
			))}
		</div>
	)
}

export default Blogs
