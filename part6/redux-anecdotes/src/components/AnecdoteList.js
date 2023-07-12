import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<div>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		return anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filter.toLowerCase())
		)
	})
	const dispatch = useDispatch()

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => {
						dispatch(
							setNotification(
								`you voted for '${anecdote.content}'`
							)
						)
						dispatch(voteFor(anecdote.id))
					}}
				/>
			))}
		</div>
	)
}

export default AnecdoteList
