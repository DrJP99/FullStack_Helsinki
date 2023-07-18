import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
	const result = useQuery(ALL_BOOKS_BY_GENRE, {
		variables: {
			genre: null,
		},
	})
	const [selectedGenre, setSelectedGenre] = useState('all')
	const [availableGenres, setAvailableGenres] = useState(null)
	let books = null

	console.log(result)

	if (result.loading) {
		return <div>loading books...</div>
	}

	books = result.data.allBooks

	if (availableGenres === null) {
		let genres = []
		books.forEach((book) => {
			book.genres.forEach((gen) => {
				if (!genres.includes(gen)) {
					genres = genres.concat(gen)
				}
			})
		})
		setAvailableGenres(genres)
	}

	return (
		<div>
			<h2>books</h2>
			<div>
				select genre:{' '}
				<select
					onChange={({ target }) => {
						setSelectedGenre(target.value)
						console.log('refetching...')
						result.refetch({
							genre: target.value === 'all' ? null : target.value,
						})
					}}
				>
					<option value={'all'}>all</option>
					{availableGenres === null
						? null
						: availableGenres.map((g) => (
								<option key={g} value={g}>
									{g}
								</option>
						  ))}
				</select>
			</div>
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

export default Books
