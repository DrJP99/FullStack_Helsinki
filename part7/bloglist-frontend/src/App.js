//SOLUTION FOR REACT QUERY AND CONTEXT

import { useState, useEffect, useRef, useContext } from 'react'
import { useQuery } from 'react-query'
import { useMatch } from 'react-router-dom'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import NotificationContext from './reducers/notification'
import UserContext from './reducers/user'
import LoginForm from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogPage from './components/BlogPage'
import { getAll } from './services/blogs'
import { getAllUsers } from './services/users'
import blogService from './services/blogs'
import NavigationBar from './components/NavigationBar'
import { Alert } from 'react-bootstrap'

const App = () => {
	const [notification, notificationDispatch] = useContext(NotificationContext)
	const [user, userDispatch] = useContext(UserContext)

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

		return <Alert variant='success'>{message}</Alert>
	}

	const blog_result = useQuery('blogs', getAll, {
		refetchOnWindowFocus: false,
		retry: 2,
	})

	const result_users = useQuery('users', getAllUsers, {
		refetchOnWindowFocus: false,
		retry: 2,
	})

	const user_match = useMatch('/users/:id')
	const blog_match = useMatch('/blogs/:id')

	if (blog_result.isLoading || result_users.isLoading) {
		return <div>loading data...</div>
	}
	if (blog_result.isError || result_users.isLoading) {
		return (
			<div>
				Blogs service is not available due to problems with server
			</div>
		)
	}

	const blogs = blog_result.data
	const users = result_users.data

	const my_user = user_match
		? users.find((user) => user.id === user_match.params.id)
		: null
	const blog = blog_match
		? blogs.find((blog) => blog.id === blog_match.params.id)
		: null

	return (
		<>
			<NavigationBar />
			<div className='container'>
				<Notification message={notification} />
				<LoginForm />
				<Routes>
					<Route path='/' element={<Blogs blogs={blogs} />} />
					<Route path='/users' element={<Users users={users} />} />
					<Route
						path='/users/:id'
						element={<User selectedUser={my_user} />}
					/>
					<Route
						path='/blogs/:id'
						element={<BlogPage blog={blog} />}
					/>
				</Routes>
			</div>
		</>
	)
}

export default App
