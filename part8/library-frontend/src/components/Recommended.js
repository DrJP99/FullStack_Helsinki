import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE, ME } from '../queries'

const Recommended = ({ user }) => {
	const result_books = useQuery(ALL_BOOKS_BY_GENRE, {
		variables: {
			genre: user ? user.favoriteGenre : null,
		},
	})

	if (!user) {
		return <div>please login before porceding...</div>
	}
	if (result_books.loading) {
		return <div>loading data on books...</div>
	}

	const books = result_books.data.allBooks

	return (
		<div>
			<h2>recommended</h2>
			<div>
				books in your favorite genre:{' '}
				<strong>{user.favoriteGenre}</strong>
			</div>
			<br />
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Recommended
