import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
	console.log('getting diagnoses');
	res.send(diagnoseService.getDiagnoses());
});

router.get('/:code', (req, res) => {
	try {
		res.send(diagnoseService.getDiagnosisById(req.params.code));
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(404).send({ error: errorMessage });
	}
});

export default router;
