import { configureStore } from '@reduxjs/toolkit'

import anecdoreReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
	reducer: {
		anecdotes: anecdoreReducer,
		filter: filterReducer,
		notification: notificationReducer,
	},
})

export default store
