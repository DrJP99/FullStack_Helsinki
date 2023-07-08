import axios from "axios";
const base_url = "/api/persons";

const getAll = () => {
	const req = axios.get(base_url);
	return req.then((res) => res.data);
};

const create = (newPerson) => {
	const req = axios.post(base_url, newPerson);
	return req.then((res) => res.data);
};

const update = (id, newPerson) => {
	const req = axios.put(`${base_url}/${id}`, newPerson);
	return req.then((res) => res.data);
};

const del = (id) => {
	const req = axios.delete(`${base_url}/${id}`);
	return req.then((res) => res.data);
};

export default { getAll, create, update, del };
