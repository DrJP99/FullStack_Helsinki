import Part from "./Part";

const Content = ({ parts }) => {
	const total = parts.reduce((s, p) => {
		// console.log(s, p.exercises);
		return s + p.exercises;
	}, 0);
	// console.log(total);
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<p>
				<b>Number of exercises {total}</b>
			</p>
		</>
	);
};

export default Content;
