import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return { toggleVisibility }
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				{props.before}{' '}
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible} className='togglableContent'>
				{props.before} <button onClick={toggleVisibility}>hide</button>
				{props.children}
			</div>
		</div>
	)
})

export default Togglable
