interface Exercise {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const parseExerciseArguments = (args: string[]) => {
	if (args.length < 4) throw new Error('Not enough arguments');

	let target: number = 0;
	let real: number[] = [];
	args.forEach((d, i) => {
		if (i > 1) {
			if (!isNaN(Number(d))) {
				if (i === 2) {
					target = Number(d);
				} else {
					real = real.concat(Number(d));
				}
			} else {
				throw new Error(
					`Provided value at ${i} (${d}) is not a number!`
				);
			}
		}
	});

	return { target, real };
};

const calculateExercise = (real: number[], target: number) => {
	const period: number = real.length;
	const trainingDays: number = real.filter((d) => d !== 0).length;
	let success: boolean = false;
	let rating: number;
	let ratingDescription: string = '';

	// rating:
	// 3 - 100% of the days equal or more than target
	// 2 - at least 50% of days equal or more than target
	// 1 - less than 50% of days equal or more than target

	let successfulDays: number = 0;
	let sumHours: number = 0;
	real.forEach((d: number) => {
		sumHours += d;
		if (d >= target) {
			successfulDays += 1;
		}
	});

	const average: number = sumHours / period;

	if (successfulDays === period) {
		rating = 3;
		success = true;
		ratingDescription = 'great job!';
	} else if (successfulDays >= period * 0.5) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	} else {
		rating = 1;
		ratingDescription = 'you did an awful job :(';
	}

	return {
		periodLength: period,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const { target, real } = parseExerciseArguments(process.argv);
	console.log(calculateExercise(real, target));
} catch (error: unknown) {
	let errorMessage: string = 'Error';
	if (error instanceof Error) {
		errorMessage += ': ' + error.message;
	}
	console.error(errorMessage);
}
