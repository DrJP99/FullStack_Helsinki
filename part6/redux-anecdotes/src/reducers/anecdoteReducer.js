import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		sortAnecdotes(state, action) {
			return state.sort((a, b) => b.votes - a.votes)
		},
		setAnecdotes(state, action) {
			return action.payload.sort((a, b) => b.votes - a.votes)
		},
	},
})

export const {
	setAnecdotes,
	appendAnecdote,
	sortAnecdotes,
	findAnecdoteById,
	replaceAnecdoteById,
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdotesService.createAnecdote(content)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const voteFor = (id) => {
	return async (dispatch, getState) => {
		const toChange = getState().anecdotes.find((a) => a.id === id)
		if (toChange) {
			const updated = await anecdotesService.update({
				...toChange,
				votes: toChange.votes + 1,
			})
			dispatch(
				setAnecdotes(
					getState().anecdotes.map((a) => (a.id !== id ? a : updated))
				)
			)
			dispatch(sortAnecdotes())
		}
	}
}

export default anecdoteSlice.reducer

// const asObject = (anecdote) => {
// 	return {
// 		content: anecdote,
// 		id: getId(),
// 		votes: 0,
// 	}
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
// 	console.log('state now: ', state)
// 	console.log('action', action)

// 	switch (action.type) {
// 		case 'NEW_ANECDOTE': {
// 			return state.concat(action.payload)
// 		}
// 		case 'VOTE': {
// 			const id = action.payload.id
// 			const anecdoteToUpdate = state.find((a) => a.id === id)
// 			const changedAnecdote = {
// 				...anecdoteToUpdate,
// 				votes: anecdoteToUpdate.votes + 1,
// 			}

// 			const copy = state.map((a) => (a.id !== id ? a : changedAnecdote))
// 			return copy.sort((a, b) => {
// 				return b.votes - a.votes
// 			})
// 		}
// 	}

// 	return state
// }

// export const createAnecdote = (content) => {
// 	return {
// 		type: 'NEW_ANECDOTE',
// 		payload: {
// 			content,
// 			id: getId(),
// 			votes: 0,
// 		},
// 	}
// }

// export const voteFor = (id) => {
// 	return {
// 		type: 'VOTE',
// 		payload: { id },
// 	}
// }

// export default reducer
