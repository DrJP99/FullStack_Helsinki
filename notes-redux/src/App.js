import { useEffect } from 'react'

import NewNote from './components/NewNote'
import Notes from './components/Note_redux'
import VisibilityForm from './components/VisibilityFilter'

import noteService from './services/notes'
import { initializeNotes, setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeNotes)
	}, [])

	return (
		<div>
			<NewNote />
			<VisibilityForm />
			<Notes />
		</div>
	)
}

export default App
