import axios from 'axios'
const baseUrl = '/api/users'

export const getUser = async (userId) => {
	const res = await axios.get(`${baseUrl}/${userId}`)
	return res
}

export const getAllUsers = async () => {
	return (await axios.get(baseUrl)).data
}
