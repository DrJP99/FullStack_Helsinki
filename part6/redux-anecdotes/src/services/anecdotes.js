import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	return (await axios.get(baseUrl)).data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdote = async (content) => {
	const newAnecdote = {
		content: content || 'empty string...',
		id: getId(),
		votes: 0,
	}
	const res = await axios.post(baseUrl, newAnecdote)
	return res.data
}

export default { getAll, createAnecdote }
