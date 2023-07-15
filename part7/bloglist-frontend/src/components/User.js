import { useQuery, useQueryClient } from 'react-query'
import { getAllUsers } from '../services/users'
import { useParams } from 'react-router-dom'
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
					<li key={b.id}>{b.title}</li>
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
			<h1>{selectedUser.name}</h1>
			<h3>added blogs:</h3>
			<UserBlogs id={selectedUser.id} />
		</div>
	)
}

export default User
