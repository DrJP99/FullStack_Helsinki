import { useQuery, useQueryClient } from 'react-query'
import { getAllUsers } from '../services/users'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
	const queryClient = useQueryClient()
	//..

	return (
		<div>
			<h1>Users</h1>
			<Table striped>
				<thead>
					<tr>
						<th>Users:</th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>
									{user.username}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Users
