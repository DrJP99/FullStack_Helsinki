import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import NotificationContext from '../reducers/notification'
import { create } from '../services/blogs'
import { Button, Form } from 'react-bootstrap'

const BlogForm = () => {
	const queryClient = useQueryClient()
	const [notification, notificationDispatch] = useContext(NotificationContext)

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlogMutation = useMutation(create, {
		onSuccess: (new_blog) => {
			const blogs = queryClient.getQueryData('blogs')
			queryClient.setQueryData('blogs', blogs.concat(new_blog))
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `a new blog '${new_blog.title}' by '${new_blog.author}' was successfully added!`,
			})
		},
		onError: (error) => {
			console.log(error.message)
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Blog failed to add`,
			})
		},
	})
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const new_blog = {
				title,
				author,
				url,
			}
			addBlogMutation.mutate(new_blog)
			setTitle('')
			setAuthor('')
			setUrl('')
		} catch (e) {
			console.error(e.message)
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Error creating new blog`,
			})
		}
	}

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>title: </Form.Label>
					<Form.Control
						type='text'
						value={title}
						nmae='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>
					<Form.Label>author: </Form.Label>
					<Form.Control
						type='text'
						value={author}
						nmae='Author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
					<Form.Label>url: </Form.Label>
					<Form.Control
						type='text'
						value={url}
						nmae='URL'
						onChange={({ target }) => setUrl(target.value)}
					/>
					<Button type='submit'>create</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

export default BlogForm
