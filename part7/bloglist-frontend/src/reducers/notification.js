import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	console.log(action)
	switch (action.type) {
		case 'SET_NOTIF':
			return action.payload
		case 'DEL_NOTIF':
			return null
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		null
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
