import { createNote, toggleImportance } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

import NewNote from './components/NewNote'
import Notes from './components/Note_redux'

const App = () => {
	return (
		<div>
			<NewNote />
			<Notes />
		</div>
	)
}

export default App
