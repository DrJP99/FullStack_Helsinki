import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm />', async () => {
	const addBlog = jest.fn()
	const user = userEvent.setup()

	render(<BlogForm addBlog={addBlog} />)

	const inputs = screen.getAllByRole('textbox')
	const sendButton = screen.getByText('create')

	await user.type(inputs[0], 'testing a title')
	await user.type(inputs[1], 'Au Thor')
	await user.type(inputs[2], 'testing.com/url')
	await user.click(sendButton)

	console.log(addBlog.mock.calls)

	expect(addBlog.mock.calls).toHaveLength(1)
	expect(addBlog.mock.calls[0][0].title).toBe('testing a title')
	expect(addBlog.mock.calls[0][0].author).toBe('Au Thor')
	expect(addBlog.mock.calls[0][0].url).toBe('testing.com/url')
})
