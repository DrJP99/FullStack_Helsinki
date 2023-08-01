import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../types';
import patientServices from '../services/patients';
import diagnosisServices from '../services/diagnoses';

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
			<h3>entries</h3>

			{patient.entries.map((e) => (
				<div key={e.id}>
					<p>
						{e.date}: <i>{e.description}</i>
					</p>
					{e.diagnosisCodes ? (
						<ul>
							{e.diagnosisCodes.map((d) => (
								<li key={d}>
									{d}{' '}
									{
										diagnoses.find(
											(diagnosis) => diagnosis.code === d
										)?.name
									}
								</li>
							))}
						</ul>
					) : null}
				</div>
			))}
		</div>
	);
};

export default PatientPage;
