const reverse = (string) => {
	return string.split("").reverse("").join("");
};

const average = (array) => {
	const reducer = (sum, item) => {
		return sum + item;
	};
	// if (array.legth === 1) {
	// 	return array[0];
	// }
	return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = { reverse, average };
