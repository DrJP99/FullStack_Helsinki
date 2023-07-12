import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: 'This is a notification',
	reducers: {},
})

export const {} = notificationSlice.actions
export default notificationSlice.reducer
