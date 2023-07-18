import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
	const [token, setToken] = useState(null)

	const client = useApolloClient()

	const padding = {}

	useEffect(() => {
		const token = localStorage.getItem('library-user-token')
		setToken(token ? token : null)
	}, [])

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return (
		<div>
			{/* <div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('login')}>login</button>
			</div> */}

			<nav>
				<Link style={padding} to={'/'}>
					<button>home</button>
				</Link>
				<Link style={padding} to={'/authors'}>
					<button>authors</button>
				</Link>
				<Link style={padding} to={'/books'}>
					<button>books</button>
				</Link>
				{token ? (
					<>
						<Link style={padding} to={'/add'}>
							<button>add</button>
						</Link>
						<button style={padding} onClick={logout}>
							logout
						</button>
					</>
				) : (
					<Link style={padding} to={'/login'}>
						<button>login</button>
					</Link>
				)}
			</nav>

			<Routes>
				<Route path='/' element={<h1>Welcome!</h1>} />
				<Route path='/authors' element={<Authors />} />
				<Route path='/books' element={<Books />} />
				<Route path='/add' element={<NewBook />} />
				<Route
					path='/login'
					element={<LoginForm setToken={setToken} />}
				/>
			</Routes>

			{/* <Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} /> */}
		</div>
	)
}

export default App
