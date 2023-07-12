import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogs from './Blogs'

describe('<Blogs />', () => {
	let container

	beforeEach(() => {
		handleLike = jest.fn()
		const blogs = [
			{
				id: 'abc1',
				title: 'this is a title',
				author: 'Au Thor',
				likes: 0,
				url: 'url.com',
				user: {
					name: 'my name',
				},
			},
		]
		container = render(
			<Blogs blogs={blogs} handleLike={handleLike} />
		).container
	})

	test('renders only title and author by default', async () => {
		await screen.findAllByText('this is a title Au Thor')

		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('renders url and number of likes when button is pressed once', async () => {
		// screen.debug()
		const user = userEvent.setup()
		const buttonShow = screen.getByText('view')
		await user.click(buttonShow)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('clicking the like button twice', async () => {
		const user = userEvent.setup()
		const buttonShow = screen.getByText('view')
		await user.click(buttonShow)

		const buttonLike = screen.getByText('like')
		await user.click(buttonLike)
		await user.click(buttonLike)

		expect(handleLike.mock.calls).toHaveLength(2)

		// screen.debug()
	})
})
