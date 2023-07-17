import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorBirthyearForm = ({ authors }) => {
	const [name, setName] = useState('')
	const [born, setBorn] = useState('')

	const [editAuthor] = useMutation(EDIT_AUTHOR)

	const submit = (e) => {
		e.preventDefault()

		editAuthor({
			variables: {
				name,
				setBornTo: Number(born),
			},
		})

		setBorn('')
	}

	return (
		<div>
			<h3>Set birthyear</h3>
			<form onSubmit={submit}>
				<div>
					name:{' '}
					<select onChange={({ target }) => setName(target.value)}>
						{authors.map((a) => (
							<option value={a.name} key={a.id}>
								{a.name}
							</option>
						))}
					</select>
				</div>
				<div>
					born:{' '}
					<input
						type='text'
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	)
}

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS, {})

	if (!props.show) {
		return null
	}

	if (result.loading) {
		return <div>loading authors...</div>
	}
	console.log(result.data)
	const authors = result.data.allAuthors

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<AuthorBirthyearForm authors={authors} />
		</div>
	)
}

export default Authors
