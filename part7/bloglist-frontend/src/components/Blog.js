import { useContext } from 'react'
import UserContext from '../reducers/user'

const Blog = ({ blog, handleLike, handleDelete }) => {
	const [user, userDispatch] = useContext(UserContext)

	const delete_blog = () => {
		const loggedJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (!loggedJSON) {
			return
		}

		if (blog.user.username === user.username) {
			return <button onClick={() => handleDelete(blog)}>delete</button>
		}
	}

	return (
		<div>
			{blog.url}
			<br />
			{blog.likes} <button onClick={() => handleLike(blog)}>like</button>{' '}
			<br />
			{blog.user.name} <br />
			{delete_blog()}
		</div>
	)
}

export default Blog
