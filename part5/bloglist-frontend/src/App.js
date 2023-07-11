import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	//new blog form
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const [message, setMessage] = useState(null)

	const sort_blogs = (blogs) => {
		blogs.sort((a, b) => {
			return b.likes - a.likes
		})

		return blogs
	}

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(sort_blogs(blogs)))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogout = (e) => {
		e.preventDefault()

		console.log('logging out...')
		blogService.setToken(null)
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
		setUsername('')
		setPassword('')
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem(
				'loggedBlogAppUser',
				JSON.stringify(user)
			)
			setUser(user)
			blogService.setToken(user.token)
			setMessage(`${user.name} was logged in`)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
			setUsername('')
			setPassword('')
		} catch (e) {
			setMessage(`Error loggin in: username or password incorrect`)
			setTimeout(() => {
				setUser(null)
			}, 5000)
			console.error(e)
		}
	}

	const loginForm = () => (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					username:{' '}
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => {
							console.log(target.value)
							setUsername(target.value)
						}}
					/>
				</div>
				<div>
					password:{' '}
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)

	const newBlogRef = useRef()
	const createNewForm = () => (
		<Togglable buttonLabel='new' ref={newBlogRef}>
			<BlogForm addBlog={handleNewBlog} />
		</Togglable>
	)

	const handleNewBlog = async (new_blog) => {
		try {
			const res = await blogService.create(new_blog)
			setBlogs(blogs.concat(res))

			setMessage(
				`a new blog ${title} by ${author} was successfully added!`
			)
			newBlogRef.current.toggleVisibility()
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (e) {
			console.error(e.message)
			setMessage('Error creating new blog')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleLike = async (blog) => {
		try {
			const updated_blog = {
				...blog,
				likes: blog.likes + 1,
				user: blog.user.id,
			}

			const returnedObject = await blogService.update(updated_blog)

			let copy_array = blogs.map((b) =>
				b.id === returnedObject.id ? returnedObject : b
			)
			copy_array = sort_blogs(copy_array)
			setBlogs(copy_array)
		} catch (e) {
			console.error(e.message)
			setMessage('Error creating new blog')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleDelete = async (blog) => {
		if (
			window.confirm(
				`Do you want to delete ${blog.title} by ${blog.author}?`
			)
		) {
			try {
				await blogService.del(blog)
				setBlogs(blogs.filter((b) => b.id !== blog.id))
			} catch (e) {
				console.log(e.message)
			}
		}
	}

	const Notification = ({ message }) => {
		if (message === null) {
			return null
		}

		return (
			<div
				style={{
					background: 'lightgrey',
					fontSize: 20,
					borderStyle: 'solid',
					borderRadius: 5,
					padding: 10,
					marginBottom: 10,
				}}
			>
				{message}
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			{!user ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in{' '}
						<button onClick={handleLogout}>logout</button>
					</p>
					{createNewForm()}
				</div>
			)}
			<Blogs
				blogs={blogs}
				handleLike={handleLike}
				handleDelete={handleDelete}
			/>
		</div>
	)
}

export default App
