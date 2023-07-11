import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
	if (newToken) {
		token = `Bearer ${newToken}`;
	} else {
		token = null;
	}
	console.log(token);
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
