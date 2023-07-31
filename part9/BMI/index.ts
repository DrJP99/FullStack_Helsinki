import express from 'express';
import { calcualteBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if (!height || !weight || isNaN(weight) || isNaN(height)) {
		res.send({ error: 'malformed parameters' });
	} else {
		const result = calcualteBmi(height, weight);
		res.send({
			height,
			weight,
			bmi: result,
		});
	}
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
});
