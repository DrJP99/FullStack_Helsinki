import ReactDOM from 'react-dom/client'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

import { createNote } from './reducers/noteReducer'

const store = configureStore({
	reducer: {
		notes: noteReducer,
		filter: filterReducer,
	},
})

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
