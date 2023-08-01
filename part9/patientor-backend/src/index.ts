import express from 'express';
import cors = require('cors');
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
	res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
	console.log(`Server running at ${PORT}`);
});
