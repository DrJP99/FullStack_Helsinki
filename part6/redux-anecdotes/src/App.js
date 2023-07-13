import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { initializeAnecdotes, setAll } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAnecdotes())
	}, [])

	return (
		<div>
			<Notification />
			<h2>Anecdotes</h2>
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App
