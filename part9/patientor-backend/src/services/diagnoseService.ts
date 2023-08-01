import data from '../../data/diagnoses';
import { Diagnosis } from '../../types';

export const getDiagnoses = (): Diagnosis[] => {
	return data;
};

export const getDiagnosisById = (id: string): Diagnosis => {
	const res = data.find((d) => d.code === id);
	if (res) {
		return res;
	} else {
		throw new Error('Diagnosis with such code does not exist');
	}
};

export default {
	getDiagnoses,
	getDiagnosisById,
};
