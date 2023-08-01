import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis, Entry } from '../types';
import patientServices from '../services/patients';
import diagnosisServices from '../services/diagnoses';
import Entries from './Entries/Entries';

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient | undefined>(undefined);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			patientServices.getPatientById(id).then((res) => setPatient(res));
		}
	}, []);

	useEffect(() => {
		if (patient) {
			let codes: string[] = [];
			patient.entries.forEach((e) => {
				if (e.diagnosisCodes) {
					e.diagnosisCodes.forEach((d) => (codes = codes.concat(d)));
				}
			});
			let diagnosesList: Diagnosis[] = [];
			codes.forEach((c) => {
				diagnosisServices.getDiagnosesByCode(c).then((res) => {
					diagnosesList = diagnosesList.concat(res);
					setDiagnoses(diagnosesList);
				});
			});
		}
	}, [patient]);

	if (!patient) {
		return <h3>no patient</h3>;
	}

	return (
		<div>
			<h1>{patient?.name}</h1>
			<div>gender: {patient.gender}</div>
			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
			<Entries entries={patient.entries} />
		</div>
	);
};

export default PatientPage;
