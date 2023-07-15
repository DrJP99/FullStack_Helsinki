import { useQuery, useQueryClient } from 'react-query'
import { getAllUsers } from '../services/users'
import { Link, useParams } from 'react-router-dom'

const Users = () => {
	const queryClient = useQueryClient()
	//..

	const result = useQuery('users', getAllUsers, {
		refetchOnWindowFocus: false,
		retry: 2,
	})

	if (result.isLoading) {
		return <div>loading data...</div>
	}
	if (result.isError) {
		return (
			<div>
				Users service is not available due to problems with server
			</div>
		)
	}

	const users = result.data

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>
							<strong>blogs created</strong>
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/user/${user.id}`}>
									{user.username}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
