import diaries from '../../data/diaries';
import { DiaryEntry, NonSensitiveEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
	return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveEntry[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({
		id,
		date,
		weather,
		visibility,
	}));
};

const addDiary = () => {
	return null;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	addDiary,
};
