import express from 'express';
import { calcualteBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (!height || !weight || isNaN(weight) || isNaN(height)) {
		return res.status(400).send({ error: 'malformed parameters' });
	}

	const result = calcualteBmi(height, weight);
	return res.send({
		height,
		weight,
		bmi: result,
	});
});

app.post('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).send({ error: 'parameters missing' });
	}

	let invalidHours = false;
	try {
		daily_exercises.forEach((d: number) => {
			if (isNaN(Number(d))) {
				invalidHours = true;
			}
		});
	} catch {
		invalidHours = true;
	}

	if (isNaN(Number(target)) || invalidHours) {
		return res.status(400).send({ error: 'malformed parameters' });
	}

	const result = calculateExercise(daily_exercises, target);
	return res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
});
