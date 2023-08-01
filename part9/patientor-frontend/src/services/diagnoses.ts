import axios from 'axios';
import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

const getDiagnosesByCode = async (code: string) => {
	const res = await axios.get<Diagnosis>(`${apiBaseUrl}/diagnoses/${code}`);
	return res.data;
};

export default { getDiagnosesByCode };
