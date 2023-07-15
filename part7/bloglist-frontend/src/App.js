//SOLUTION FOR REACT QUERY AND CONTEXT

import { useState, useEffect, useRef, useContext } from 'react'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import NotificationContext from './reducers/notification'
import UserContext from './reducers/user'
import LoginForm from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
	const [notification, notificationDispatch] = useContext(NotificationContext)

	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				notificationDispatch({
					type: 'DEL_NOTIF',
				})
			}, 5000)
		}
	}, [notification])

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
			<Notification message={notification} />
			<LoginForm />
			<Routes>
				<Route path='/' element={<Blogs />} />
				<Route path='/users' element={<Users />} />
			</Routes>
		</div>
	)
}

export default App
