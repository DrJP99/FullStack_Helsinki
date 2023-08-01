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

	console.log(patient.entries);

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
								<li key={d}>{d}</li>
							))}
						</ul>
					) : null}
				</div>
			))}
		</div>
	);
};

export default PatientPage;
