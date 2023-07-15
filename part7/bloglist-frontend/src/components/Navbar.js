import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../reducers/user'
import blogService from '../services/blogs'

const Navbar = () => {
	const [user, userDispatch] = useContext(UserContext)

	const item_style = {
		padding: 5,
	}

	const handleLogout = (e) => {
		e.preventDefault()

		console.log('logging out...')
		blogService.setToken(null)
		window.localStorage.removeItem('loggedBlogAppUser')
		userDispatch({
			type: 'DEL_USER',
		})
	}

	return (
		<div>
			<Link to='/' style={item_style}>
				blogs
			</Link>
			<Link to='/users' style={item_style}>
				users
			</Link>
			{user ? (
				<em style={item_style}>
					Logged in as {user.username}{' '}
					<button onClick={handleLogout}>logout</button>
				</em>
			) : null}
		</div>
	)
}

export default Navbar
