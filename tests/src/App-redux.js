import { createNote, toggleImportance } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

import NewNote from './components/NewNote'
import Notes from './components/Note_redux'
import VisibilityForm from './components/VisibilityFilter'

const App = () => {
	return (
		<div>
			<NewNote />
			<VisibilityForm />
			<Notes />
		</div>
	)
}

export default App
