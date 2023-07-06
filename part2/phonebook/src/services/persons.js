import axios from "axios";
const base_url = "http://localhost:3001/persons";

const getAll = () => {
	const req = axios.get(base_url);
	return req.then((res) => res.data);
};

const create = (newPerson) => {
	const req = axios.post(base_url, newPerson);
	return req.then((res) => res.data);
};

const update = (id, newPerson) => {
	const req = axios.post(`${base_url}/${id}`, newPerson);
	return req.then((res) => res.data);
};

export default { getAll, create, update };
