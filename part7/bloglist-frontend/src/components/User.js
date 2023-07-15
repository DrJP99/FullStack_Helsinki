import { useQuery, useQueryClient } from 'react-query'
import { getAllUsers } from '../services/users'
import { useParams, Link } from 'react-router-dom'
import { getAll } from '../services/blogs'

const UserBlogs = ({ id }) => {
	const result = useQuery('blogs', getAll, {
		refetchOnWindowFocus: false,
		retry: 2,
	})

	if (result.isLoading) {
		return <div>loading blog data...</div>
	}
	if (result.isError) {
		return (
			<div>
				Blogs service is not available due to problems with server
			</div>
		)
	}

	const all_blogs = result.data
	console.log(all_blogs)
	const user_blogs = all_blogs.filter((blog) => blog.user.id === id)
	console.log(user_blogs)

	return (
		<div>
			<ul>
				{user_blogs.map((b) => (
					<li key={b.id}>
						<Link to={`/blogs/${b.id}`}>{b.title}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

const User = ({ selectedUser }) => {
	if (!selectedUser) {
		return <div>user not found...</div>
	}

	return (
		<div>
			<h1>User</h1>
			<h2>{selectedUser.name}</h2>
			<h5>added blogs:</h5>
			<UserBlogs id={selectedUser.id} />
		</div>
	)
}

export default User
