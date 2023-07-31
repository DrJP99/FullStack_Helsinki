import data from '../../data/patients';
import { NonSensitivePatient, Patient } from '../../types';

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

export default {
	getPatients,
	getNonSensitivePatients,
};
