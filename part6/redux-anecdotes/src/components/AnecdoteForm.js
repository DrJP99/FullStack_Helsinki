import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const newAnecdote = async (e) => {
		e.preventDefault()
		const content = e.target.anecdote.value
		e.target.anecdote.value = ''
		const newAnecdote = await anecdotesService.createAnecdote(content)
		dispatch(createAnecdote(newAnecdote))
		dispatch(setNotification(`you created the anecdote '${content}'`))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={newAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
