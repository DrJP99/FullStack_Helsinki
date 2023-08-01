import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getDiaries } from './services/diaryServices';
import Diaries from './components/Diaries';

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getDiaries().then((res) => setDiaries(res));
	}, []);

	return (
		<div>
			<h1>Flight Diaries</h1>
			<Diaries diaries={diaries} />
		</div>
	);
};

export default App;
