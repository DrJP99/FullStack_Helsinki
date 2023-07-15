import { useQuery, useQueryClient } from 'react-query'
import { getAllUsers } from '../services/users'
import { Link, useParams } from 'react-router-dom'

const Users = ({ users }) => {
	const queryClient = useQueryClient()
	//..

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
