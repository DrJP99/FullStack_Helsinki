import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'

const App = () => {
	const queryClient = useQueryClient()
	const [notification, dispatch] = useContext(NotificationContext)

	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData(
				'anecdotes',
				anecdotes.map((a) => {
					return a.id !== updatedAnecdote.id ? a : updatedAnecdote
				})
			)
			dispatch({
				type: 'SET_NOTIF',
				payload: `Voted for ${updatedAnecdote.content}`,
			})
		},
	})
	const handleVote = async (anecdote) => {
		updateAnecdoteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1,
		})
	}

	const result = useQuery('anecdotes', getAnecdotes, {
		refetchOnWindowFocus: false,
		retry: 1,
	})

	console.log(result)

	if (result.isLoading) {
		return <div>loading data...</div>
	}
	if (result.isError) {
		return (
			<div>
				anecdote service is not available due to problems with server
			</div>
		)
	}

	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => {
								handleVote(anecdote)
							}}
						>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
