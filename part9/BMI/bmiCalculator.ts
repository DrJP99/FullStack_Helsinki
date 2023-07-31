const parseBmiArguments = (args: string[]) => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			mass: Number(args[3]),
		};
	} else {
		throw new Error('Provided values are not numbers!');
	}
};

const bmiCategories = (bmi: number) => {
	if (bmi < 16) {
		return 'Underweight (Severe Thinness)';
	} else if (bmi >= 16 && bmi < 17) {
		return 'Underweight (Moderate thinness)';
	} else if (bmi >= 17 && bmi < 18.5) {
		return 'Underweigth (Mild thinness)';
	} else if (bmi >= 18.5 && bmi < 25) {
		return 'Normal range';
	} else if (bmi >= 25 && bmi < 30) {
		return 'Overweight (Pre-obese)';
	} else if (bmi >= 30 && bmi < 35) {
		return 'Overweight (Class I)';
	} else if (bmi >= 35 && bmi < 40) {
		return 'Overweight (Class II)';
	} else if (bmi >= 40) {
		return 'Overweight (Class III)';
	} else {
		return '';
	}
};

export const calcualteBmi = (height: number, mass: number) => {
	const bmi: number = mass / (height / 100) ** 2;
	let result: string = bmiCategories(bmi);

	return result;
};

try {
	const { height, mass } = parseBmiArguments(process.argv);
	console.log(calcualteBmi(height, mass));
} catch (error: unknown) {
	let errorMessage = 'Error';
	if (error instanceof Error) {
		errorMessage += ': ' + error.message;
	}
	console.error(errorMessage);
}
