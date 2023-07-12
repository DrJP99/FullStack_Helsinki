import ReactDOM from 'react-dom/client'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

import { createNote } from './reducers/noteReducer'

const reducer = combineReducers({
	notes: noteReducer,
	filter: filterReducer,
})

const store = createStore(reducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(
	createNote('combined reducers forms one reducer from many simple reducers')
)
