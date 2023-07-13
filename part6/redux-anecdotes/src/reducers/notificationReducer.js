import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		text: '',
		time: 5,
	},
	reducers: {
		setText(state, action) {
			state.text = action.payload
		},
		setTime(state, action) {
			state.time = action.payload
		},
	},
})

export const { setText, setTime } = notificationSlice.actions

export const setNotification = (text, time) => {
	return (dispatch) => {
		dispatch(setText(text))
		dispatch(setTime(time))
	}
}

export default notificationSlice.reducer
