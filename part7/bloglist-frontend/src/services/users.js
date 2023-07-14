import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (userId) => {
	const res = await axios.get(`${baseUrl}/${userId}`)
	return res
}

export default { getUser }
