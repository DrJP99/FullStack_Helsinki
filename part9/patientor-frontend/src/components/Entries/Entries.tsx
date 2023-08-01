import { useEffect, useState } from 'react';
import { Entry } from '../../../../patientor-backend/types';
import { Diagnosis } from '../../types';
import diagnosisServices from '../../services/diagnoses';
import EntryDetails from './EntryDetails';

const Entries = ({ entries }: { entries: Entry[] }) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

	useEffect(() => {
		let codes: string[] = [];
		entries.forEach((e) => {
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
	}, []);

	if (entries.length === 0) {
		return <h1>No entries</h1>;
	}

	return (
		<div>
			<h3>Entries:</h3>
			{entries.map((e) => (
				<div key={e.id}>
					<EntryDetails entry={e} diagnoses={diagnoses} />
				</div>
			))}
		</div>
	);
};

export default Entries;
