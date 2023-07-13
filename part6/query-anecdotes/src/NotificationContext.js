import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIF':
			console.log(action)
			return action.payload
		case 'DELETE_NOTIF':
			return null
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		0
	)

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
