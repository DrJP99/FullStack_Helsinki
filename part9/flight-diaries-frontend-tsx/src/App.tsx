import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { createDiary, getDiaries } from './services/diaryServices';
import Diaries from './components/Diaries';
import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [notification, setNoification] = useState('');

	useEffect(() => {
		getDiaries().then((res) => setDiaries(res));
	}, []);

	const handleAddDiary = (object: object) => {
		createDiary(object)
			.then((res) => setDiaries(diaries.concat(res)))
			.catch((error) => {
				setNoification(error.response.data);
				setTimeout(() => {
					setNoification('');
				}, 3000);
				console.error(error.response.data);
			});
	};

	return (
		<div>
			<h1>Flight Diaries</h1>
			{notification && notification !== '' ? (
				<div style={{ color: 'red' }}>{notification}</div>
			) : null}
			<NewDiaryForm handleCreate={handleAddDiary} />
			<Diaries diaries={diaries} />
		</div>
	);
};

export default App;
