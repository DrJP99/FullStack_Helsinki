import {
	Diagnosis,
	Entry,
	HealthCheckEntry,
	HealthCheckRating,
	HospitalEntry,
	OccupationalHealthcareEntry,
} from '../../types';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { blue, green, red, yellow } from '@mui/material/colors';

export const entryStyle = {
	borderWidth: 1,
	borderBlockColor: 'black',
	borderRadius: 5,
	borderStyle: 'solid',
	padding: 5,
	margin: 10,
};

export const EntryHealthCheck = ({
	entry,
	diagnoses,
}: {
	entry: HealthCheckEntry;
	diagnoses: Diagnosis[];
}) => {
	const getRatingColor = (rating: HealthCheckRating) => {
		switch (rating) {
			case 0:
				return green[500];
			case 1:
				return blue[500];
			case 2:
				return yellow[500];
			case 3:
				return red[500];
		}
	};

	console.log('etnry:', entry);
	return (
		<div style={entryStyle}>
			<div>
				{entry.date} <ManageSearchIcon color='inherit' />
			</div>
			<p>
				<i>{entry.description}</i>
			</p>
			<p>
				Rating:{' '}
				{
					<FavoriteIcon
						sx={{
							color: getRatingColor(entry.healthCheckRating),
						}}
					/>
				}
			</p>
			{entry.diagnosisCodes ? (
				<ul>
					{entry.diagnosisCodes.map((d) => (
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
			<p>Diagnosis by {entry.specialist}</p>
		</div>
	);
};

export const EntryHospital = ({
	entry,
	diagnoses,
}: {
	entry: HospitalEntry;
	diagnoses: Diagnosis[];
}) => {
	return (
		<div style={entryStyle}>
			<div>
				{entry.date} <VaccinesIcon color='inherit' />
			</div>
			<p>
				<i>{entry.description}</i>
			</p>

			{entry.diagnosisCodes ? (
				<ul>
					<div>
						<strong>Diagnoses:</strong>
					</div>
					{entry.diagnosisCodes.map((d) => (
						<li key={d}>
							({d}){' '}
							{
								diagnoses.find(
									(diagnosis) => diagnosis.code === d
								)?.name
							}
						</li>
					))}
				</ul>
			) : null}
			<p>
				Discharged: ({entry.discharge.date}){' '}
				<i>{entry.discharge.criteria}</i>
			</p>
			<p>Diagnosis by {entry.specialist}</p>
		</div>
	);
};

export const EntryOccupational = ({
	entry,
	diagnoses,
}: {
	entry: OccupationalHealthcareEntry;
	diagnoses: Diagnosis[];
}) => {
	return (
		<div style={entryStyle}>
			<div>
				{entry.date} <BusinessCenterIcon color='inherit' />
			</div>
			<p>
				<i>{entry.description}</i>
			</p>
			<p>
				<b>Employer: </b> {entry.employerName}
			</p>

			{entry.diagnosisCodes ? (
				<ul>
					<div>
						<strong>Diagnoses:</strong>
					</div>
					{entry.diagnosisCodes.map((d) => (
						<li key={d}>
							({d}){' '}
							{
								diagnoses.find(
									(diagnosis) => diagnosis.code === d
								)?.name
							}
						</li>
					))}
				</ul>
			) : null}
			{entry.sickLeave ? (
				<div>
					<b>Sick leave:</b>
					<div>
						<b>Start: </b>
						{entry.sickLeave.startDate}
					</div>
					<div>
						<b>End: </b> {entry.sickLeave.endDate}
					</div>
				</div>
			) : null}
			<p>Diagnosis by {entry.specialist}</p>
		</div>
	);
};

const EntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[];
}) => {
	switch (entry.type) {
		case 'HealthCheck':
			return <EntryHealthCheck entry={entry} diagnoses={diagnoses} />;
		case 'Hospital':
			return <EntryHospital entry={entry} diagnoses={diagnoses} />;
		case 'OccupationalHealthcare':
			return <EntryOccupational entry={entry} diagnoses={diagnoses} />;
	}
};

export default EntryDetails;
