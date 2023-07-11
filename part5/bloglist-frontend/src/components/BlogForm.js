import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()

		const new_blog = {
			title,
			author,
			url,
		}

		const res = await addBlog(new_blog)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					title:{' '}
					<input
						type='text'
						value={title}
						nmae='Title'
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:{' '}
					<input
						type='text'
						value={author}
						nmae='Author'
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:{' '}
					<input
						type='text'
						value={url}
						nmae='URL'
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default BlogForm
