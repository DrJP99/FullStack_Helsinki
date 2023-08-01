import { Gender, NewPatient } from '../types';

const isString = (str: unknown): str is string => {
	return typeof str === 'string' || str instanceof String;
};

const isDate = (date: string): boolean => {
	console.log('DoB', Date.parse(date));
	return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
	return Object.values(Gender)
		.map((g) => g.toString())
		.includes(gender);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}

	return name;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}

	return date;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}

	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender');
	}

	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}

	return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}

	console.log(object);

	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object
	) {
		const newPatient: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			ssn: parseSsn(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseOccupation(object.occupation),
		};

		return newPatient;
	}

	throw new Error('Incorrect data: some fields were missing');
};
