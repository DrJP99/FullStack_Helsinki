import { useQueryClient, useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { del, update } from '../services/blogs'
import NotificationContext from '../reducers/notification'
import UserContext from '../reducers/user'

const BlogPage = ({ blog }) => {
	const queryClient = useQueryClient()
	const [notification, notificationDispatch] = useContext(NotificationContext)
	const [user, userDispatch] = useContext(UserContext)

	const navigate = useNavigate()
	const deleteBlogMutation = useMutation(del, {
		onSuccess: (res) => {
			queryClient.refetchQueries('blogs')
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Blog successfully deleted`,
			})
			navigate('/')
		},
		onError: (error) => {
			console.log(error.message)
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Blog deletion failed`,
			})
		},
	})

	const updateBlogMutation = useMutation(update, {
		onSuccess: (blog) => {
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Liked blog '${blog.title}' by '${blog.author}'`,
			})
			const blogs = queryClient.getQueryData('blogs')
			queryClient.setQueryData(
				'blogs',
				blogs.map((b) => (b.id !== blog.id ? b : blog))
			)
		},
		onError: (error) => {
			console.log(error.message)
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Blog failed to like`,
			})
		},
	})

	if (!blog) {
		return <div>Blog not found...</div>
	}

	const handleDelete = async () => {
		// event.preventDefault()
		if (
			window.confirm(
				`Do you want to delete ${blog.title} by ${blog.author}?`
			)
		) {
			console.log('want to delete...', blog)
			deleteBlogMutation.mutate(blog)
		}
	}
	const handleLike = async () => {
		// event.preventDefault()
		console.log('want to like...', blog)
		updateBlogMutation.mutate({
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		})
	}

	return (
		<div>
			<h2>{blog.title}</h2>
			<p>{blog.info}</p>
			<p>
				{blog.likes} likes <button onClick={handleLike}>like</button>
			</p>
			<p>Added by {blog.user.name}</p>
			{user && user.username === blog.user.username ? (
				<button onClick={handleDelete}>delete</button>
			) : null}
			{blog.comments ? (
				<div>
					<h3>comments</h3>
					<ul>
						{blog.comments.map((comment, i) => (
							<li key={i}>{comment}</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	)
}

export default BlogPage
