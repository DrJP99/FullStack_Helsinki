import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	return (await axios.get(baseUrl)).data
}

export default { getAll }
