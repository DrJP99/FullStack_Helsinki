import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../reducers/user'
import blogService from '../services/blogs'
import { Button, Nav, Navbar } from 'react-bootstrap'

const NavigationBar = () => {
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
			<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
				<div className='container'>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link href='#' as='span'>
								<Link to='/' style={item_style}>
									blogs
								</Link>
							</Nav.Link>
							<Nav.Link href='#' as='span'>
								<Link to='/users' style={item_style}>
									users
								</Link>
							</Nav.Link>
							<Nav.Link href='#' as='span'>
								{user ? (
									<em style={item_style}>
										Logged in as {user.username}{' '}
										<Button
											variant='primary'
											onClick={handleLogout}
										>
											logout
										</Button>
									</em>
								) : null}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</div>
			</Navbar>
		</div>
	)
}

export default NavigationBar
