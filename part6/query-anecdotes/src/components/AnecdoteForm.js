import { useQueryClient, useMutation } from 'react-query'
import { useContext } from 'react'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const [notification, dispatch] = useContext(NotificationContext)

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
			dispatch({
				type: 'SET_NOTIF',
				payload: `Created new note '${newAnecdote.content}'`,
			})
		},
	})
	const onCreate = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		console.log('new anecdote:', content)
		newAnecdoteMutation.mutate({ content, votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
