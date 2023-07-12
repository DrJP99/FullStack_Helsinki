import { configureStore } from '@reduxjs/toolkit'

import anecdoreReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
	reducer: {
		anecdotes: anecdoreReducer,
		filter: filterReducer,
	},
})

export default store
