import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	if (newToken) {
		token = `Bearer ${newToken}`
	} else {
		token = null
	}
	console.log(token)
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const res = await axios.post(baseUrl, newObject, config)
	return res.data
}

const update = async (updatedObject) => {
	const id = updatedObject.id
	const res = await axios.put(`${baseUrl}/${id}`, updatedObject)
	return res.data
}

const del = async (deleteObject) => {
	const config = {
		headers: { Authorization: token },
	}
	const res = await axios.delete(`${baseUrl}/${deleteObject.id}`, config)
	return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, del }
