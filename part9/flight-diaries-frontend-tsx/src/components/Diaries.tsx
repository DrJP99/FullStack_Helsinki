import { DiaryEntry } from '../types';

const Diary = ({ diary }: { diary: DiaryEntry }) => {
	return (
		<div style={{ marginBottom: 25 }}>
			<h3 style={{ marginBottom: 0 }}>{diary.date}</h3>
			<div>{diary.visibility}</div>
			<div>{diary.weather}</div>
		</div>
	);
};

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
	return (
		<div>
			{diaries.map((d) => (
				<Diary key={d.id} diary={d} />
			))}
		</div>
	);
};

export default Diaries;
