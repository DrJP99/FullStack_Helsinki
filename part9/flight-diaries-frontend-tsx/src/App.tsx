import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getDiaries } from './services/diaryServices';
import Diaries from './components/Diaries';
import NewDiaryForm from './components/NewDiaryForm';

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getDiaries().then((res) => setDiaries(res));
	}, []);

	return (
		<div>
			<h1>Flight Diaries</h1>
			<NewDiaryForm diaries={diaries} setDiaries={setDiaries} />
			<Diaries diaries={diaries} />
		</div>
	);
};

export default App;
