import { useSelector, useDispatch } from 'react-redux'
import { setText, setTime } from '../reducers/notificationReducer'
import { useState, useEffect } from 'react'

const Notification = () => {
	const [visible, setVisible] = useState(false)
	const dispatch = useDispatch()
	const notification = useSelector((state) => state.notification)

	let style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		display: visible ? 'inline' : 'none',
	}

	const countdown = (time) => {
		console.log(time)
		if (time > 0) {
			setTimeout(() => {
				dispatch(setTime(time - 1))
				if (countdown(time - 1)) return true
			}, 1000)
		} else {
			console.log('finished!')
			console.log(notification.time)
			return true
		}
	}

	const hideNotification = () => {
		setVisible(false)
	}

	const showNotification = () => {
		setVisible(true)
	}

	useEffect(() => {
		if (notification.text !== '' && notification.time > 0) {
			showNotification()
			setTimeout(() => {
				hideNotification()
				dispatch(setTime(0))
				dispatch(setText(''))
			}, notification.time * 1000)
		}
	}, [notification.text])

	return <div style={style}>{notification.text}</div>
}

export default Notification
