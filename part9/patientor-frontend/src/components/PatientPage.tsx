import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import patientServices from '../services/patients';

const PatientPage = () => {
	const [patient, setPatient] = useState<Patient | undefined>(undefined);
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			patientServices.getPatientById(id).then((res) => setPatient(res));
		}
	}, []);

	if (!patient) {
		return <h3>no patient</h3>;
	}

	return (
		<div>
			<h1>{patient?.name}</h1>
			<div>gender: {patient.gender}</div>
			<div>ssn: {patient.ssn}</div>
			<div>occupation: {patient.occupation}</div>
		</div>
	);
};

export default PatientPage;
