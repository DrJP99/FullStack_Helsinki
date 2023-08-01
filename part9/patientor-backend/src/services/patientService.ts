import { v1 as uuid } from 'uuid';
import data from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../../types';

const getPatients = (): Patient[] => {
	return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
	return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatient) => {
	const newPatient = {
		id: uuid(),
		...patient,
	};

	data.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	getNonSensitivePatients,
	addPatient,
};
