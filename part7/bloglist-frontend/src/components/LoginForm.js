import { useState, useEffect, useContext, useRef } from 'react'
import UserContext from '../reducers/user'
import blogService from '../services/blogs'
import loginService from '../services/login'
import usersService from '../services/users'
import NotificationContext from '../reducers/notification'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [user, userDispatch] = useContext(UserContext)
	const [notification, notificationDispatch] = useContext(NotificationContext)

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

	const MyForm = () => {
		return (
			<div>
				<h2>Login</h2>
				<Form onSubmit={handleLogin}>
					<Form.Group>
						<Form.Label>username:</Form.Label>
						<Form.Control
							type='text'
							name='Username'
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
						<Form.Label>password:</Form.Label>
						<Form.Control
							type='password'
							name='Password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<Button variant='primary' type='submit'>
							login
						</Button>
					</Form.Group>
				</Form>
			</div>
		)
	}

	return <div>{!user ? MyForm() : null}</div>
}

export default LoginForm
