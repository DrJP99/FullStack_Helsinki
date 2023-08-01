import { useState } from 'react';
import { createDiary } from '../services/diaryServices';
import { DiaryEntry } from '../types';

const NewDiaryForm = ({
	diaries,
	setDiaries,
}: {
	diaries: DiaryEntry[];
	setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}) => {
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

		createDiary(diaryToAdd).then((res) => setDiaries(diaries.concat(res)));

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
					type='text'
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
			</label>
			<br />
			<label>
				visibility
				<input
					type='text'
					value={visibility}
					onChange={({ target }) => setVisibility(target.value)}
				/>
			</label>
			<br />
			<label>
				weather
				<input
					type='text'
					value={weather}
					onChange={({ target }) => setWeather(target.value)}
				/>
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
