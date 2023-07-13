import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { setAll } from './reducers/anecdoteReducer'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		anecdotesService.getAll().then((res) => {
			console.log(res)
			dispatch(setAll(res))
		})
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
