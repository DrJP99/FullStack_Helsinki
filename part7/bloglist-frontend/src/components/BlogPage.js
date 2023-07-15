import { useQueryClient, useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { addComment, del, update } from '../services/blogs'
import NotificationContext from '../reducers/notification'
import UserContext from '../reducers/user'
import { Button, Form } from 'react-bootstrap'

const BlogPage = ({ blog }) => {
	const queryClient = useQueryClient()
	const [notification, notificationDispatch] = useContext(NotificationContext)
	const [user, userDispatch] = useContext(UserContext)

	const [comm, setComm] = useState('')

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

	const addCommentMutation = useMutation(
		({ blog, content }) => addComment(blog, content),
		{
			onSuccess: (blog) => {
				notificationDispatch({
					type: 'SET_NOTIF',
					payload: `comment added succesfully`,
				})
				const blogs = queryClient.getQueryData('blogs')
				queryClient.setQueryData(
					'blogs',
					blogs.map((b) => (b.id !== blog.id ? b : blog))
				)
				setComm('')
			},
			onError: (error) => {
				console.log(error.message)
				notificationDispatch({
					type: 'SET_NOTIF',
					payload: `Failed to add comment`,
				})
			},
		}
	)

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

	const handleComment = async (e) => {
		e.preventDefault()

		const content = comm
		addCommentMutation.mutate({ blog, content })
	}

	return (
		<div>
			<h1>Blog</h1>
			<h2>{blog.title}</h2>
			<p>{blog.info}</p>
			<p>
				{blog.likes} likes <Button onClick={handleLike}>like</Button>
			</p>
			<p>Added by {blog.user.name}</p>
			{user && user.username === blog.user.username ? (
				<Button onClick={handleDelete}>delete</Button>
			) : null}
			{blog.comments ? (
				<div>
					<h3>comments</h3>
					<Form>
						<Form.Group>
							<Form.Control
								type='text'
								value={comm}
								onChange={(e) => {
									console.log(e.target.value)
									setComm(e.target.value)
								}}
							/>
							<Button onClick={(e) => handleComment(e)}>
								add comment
							</Button>
						</Form.Group>
					</Form>
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
