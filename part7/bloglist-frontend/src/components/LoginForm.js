import { useState, useEffect, useContext, useRef } from 'react'
import UserContext from '../reducers/user'
import blogService from '../services/blogs'
import loginService from '../services/login'
import usersService from '../services/users'
import NotificationContext from '../reducers/notification'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [user, userDispatch] = useContext(UserContext)
	const [notification, notificationDispatch] = useContext(NotificationContext)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			userDispatch({
				type: 'SET_USER',
				payload: {
					...user,
				},
			})
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem(
				'loggedBlogAppUser',
				JSON.stringify(user)
			)
			userDispatch({
				type: 'SET_USER',
				payload: {
					...user,
				},
			})
			blogService.setToken(user.token)
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `${user.name} was logged in`,
			})
			setUsername('')
			setPassword('')
		} catch (e) {
			notificationDispatch({
				type: 'SET_NOTIF',
				payload: `Error loggin in: username or password incorrect`,
			})
			console.error(e)
		}
	}

	const handleLogout = (e) => {
		e.preventDefault()

		console.log('logging out...')
		blogService.setToken(null)
		window.localStorage.removeItem('loggedBlogAppUser')
		userDispatch({
			type: 'DEL_USER',
		})
		setUsername('')
		setPassword('')
	}

	const Form = () => {
		return (
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
	}

	return (
		<div>
			{!user ? (
				Form()
			) : (
				<div>
					<p>
						{user.name} logged in{' '}
						<button onClick={handleLogout}>logout</button>
					</p>
				</div>
			)}
		</div>
	)
}

export default LoginForm
