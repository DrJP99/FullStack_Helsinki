import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return { setVisible }
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				{props.before}{' '}
				<Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible} className='togglableContent'>
				{props.before} <Button onClick={toggleVisibility}>hide</Button>
				{props.children}
			</div>
		</div>
	)
})

export default Togglable
