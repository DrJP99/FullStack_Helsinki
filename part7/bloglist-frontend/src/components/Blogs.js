import { useContext } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import Blog from './Blog'
import Togglable from './Togglable'
import { del, getAll, update } from '../services/blogs'
import NotificationContext from '../reducers/notification'

const Blogs = () => {
	const queryClient = useQueryClient()
	const [notification, notificationDispatch] = useContext(NotificationContext)

	const deleteBlogMutation = useMutation(del, {
		onSuccess: (res) => {
			queryClient.refetchQueries('blogs')
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Blog successfully deleted`,
			})
		},
		onError: (error) => {
			console.log(error.message)
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Blog deletion failed`,
			})
		},
	})
	const handleDelete = async (blog) => {
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

	const updateBlogMutation = useMutation(update, {
		onSuccess: (blog) => {
			console.log(blog)
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Liked blog '${blog.title}' by '${blog.author}'`,
			})
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
	const handleLike = async (blog) => {
		// event.preventDefault()
		console.log('want to like...', blog)
		updateBlogMutation.mutate({
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id,
		})
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const result = useQuery('blogs', getAll, {
		refetchOnWindowFocus: false,
		retry: 2,
	})

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	if (result.isError) {
		return <div>Blog service is not available at the moment</div>
	}

	const blogs = result.data

	return (
		<div>
			{blogs.map((blog) => (
				<div key={blog.id} style={blogStyle}>
					<Togglable
						buttonLabel='view'
						before={blog.title + ' ' + blog.author}
					>
						<Blog
							blog={blog}
							handleLike={handleLike}
							handleDelete={handleDelete}
						/>
					</Togglable>
				</div>
			))}
		</div>
	)
}

export default Blogs
