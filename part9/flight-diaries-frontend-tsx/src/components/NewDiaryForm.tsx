import { useState } from 'react';
import { createDiary } from '../services/diaryServices';
import { DiaryEntry, Visibility, Weather } from '../types';

type DiaryFormProps = {
	handleCreate: (object: object) => void;
};

const NewDiaryForm = ({ handleCreate }: DiaryFormProps) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		const diaryToAdd = {
			date,
			visibility,
			weather,
			comment,
		};

		handleCreate(diaryToAdd);

		setDate('');
		setVisibility('');
		setWeather('');
		setComment('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				date
				<input
					type='date'
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
			</label>
			<br />
			<label>
				visibility:{' '}
				{Object.values(Visibility).map((v) => (
					<label key={v}>
						{v}{' '}
						<input
							name='visibilityRadio'
							type='radio'
							value={v}
							checked={visibility === v}
							onChange={({ target }) =>
								setVisibility(target.value)
							}
						/>
					</label>
				))}
			</label>
			<br />
			<label>
				weather:{' '}
				{Object.values(Weather).map((w) => (
					<label>
						{w}{' '}
						<input
							name='weatherRadio'
							type='radio'
							value={w}
							checked={weather === w}
							onChange={({ target }) => setWeather(target.value)}
						/>
					</label>
				))}
			</label>
			<br />
			<label>
				comment
				<input
					type='text'
					value={comment}
					onChange={({ target }) => setComment(target.value)}
				/>
			</label>
			<br />
			<button type='submit'>add</button>
		</form>
	);
};

export default NewDiaryForm;
