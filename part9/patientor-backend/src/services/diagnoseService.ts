import data from '../../data/diagnoses';
import { Diagnose } from '../../types';

export const getDiagnoses = (): Diagnose[] => {
	return data;
};

export default {
	getDiagnoses,
};
