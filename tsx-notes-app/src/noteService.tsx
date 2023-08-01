import axios from 'axios';
import { NewNote, Note } from './types';

const baseUrl = 'http://localhost:3001/notes';

export const getAllNotes = async () => {
	const res = await axios.get<Note[]>(baseUrl);
	return res.data;
};

export const createNote = async (object: NewNote) => {
	const res = await axios.post<Note>(baseUrl, object);
	return res.data;
};
