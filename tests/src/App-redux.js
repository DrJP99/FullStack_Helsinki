import store from './reducers/noteReducer'

const App = () => {
	return (
		<div>
			<ul>
				{store.getState().map((note) => (
					<li key={note.id}>
						{note.content}{' '}
						<strong>{note.importante ? 'important' : ''}</strong>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
