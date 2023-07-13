import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
	name: 'anecdote',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload)
		},
		voteFor(state, action) {
			const id = action.payload
			const toChange = state.find((a) => a.id === id)
			const updated = {
				...toChange,
				votes: toChange.votes + 1,
			}
			const copy = state.map((a) => (a.id !== id ? a : updated))
			return copy.sort((a, b) => b.votes - a.votes)
		},
		setAll(state, action) {
			return action.payload
		},
	},
})

export const { createAnecdote, voteFor, setAll } = anecdoteSlice.actions
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
