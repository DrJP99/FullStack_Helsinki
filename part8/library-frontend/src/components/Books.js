import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
	const result = useQuery(ALL_BOOKS)
	const [selectedGenre, setSelectedGenre] = useState('all')
	const [filteredBooks, setFilteredBooks] = useState([])

	let filtered_books = []
	let books = null

	useEffect(() => {
		if (books) {
			if (selectedGenre === 'all') {
				filtered_books = result.data.allBooks
			} else {
				filtered_books = result.data.allBooks.filter((b) =>
					b.genres.includes(selectedGenre)
				)
			}
			setFilteredBooks(filtered_books)
		}
	}, [selectedGenre, books])

	if (result.loading) {
		return <div>loading books...</div>
	}

	books = result.data.allBooks

	let genres = []
	books.forEach((book) => {
		book.genres.forEach((gen) => {
			if (!genres.includes(gen)) {
				genres = genres.concat(gen)
			}
		})
	})

	return (
		<div>
			<h2>books</h2>
			<div>
				select genre:{' '}
				<select
					onChange={({ target }) => setSelectedGenre(target.value)}
				>
					<option value={'all'}>all</option>
					{genres.map((g) => (
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
					{filteredBooks.map((a) => (
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
