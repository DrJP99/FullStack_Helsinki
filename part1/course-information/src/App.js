const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Part = (props) => {
	return (
		<>
			<p>
				{props.part} {props.excercises}
			</p>
		</>
	);
};

const Content = (props) => {
	// const part1 = props.parts[0];
	// const part2 = props.parts[1];
	// const part3 = props.parts[2];

	const [part1, part2, part3] = props.parts;
	// const [excercises1, excercises2, excercises3] = props.excercises;

	// const exercises1 = props.excercises[0];
	// const exercises2 = props.excercises[1];
	// const exercises3 = props.excercises[2];
	return (
		<>
			<Part part={part1.name} excercises={part1.exercises} />
			<Part part={part2.name} excercises={part2.exercises} />
			<Part part={part3.name} excercises={part3.exercises} />
		</>
	);
};

const Total = (props) => {
	let total = 0;
	for (let i in props.parts) {
		total += props.parts[i].exercises;
	}
	return <p>Number of exercises {total}</p>;
};

const App = () => {
	const course = "Half Stack application development";
	const part1 = {
		name: "Fundamentals of React",
		exercises: 10,
	};
	const part2 = {
		name: "Using props to pass data",
		exercises: 7,
	};
	const part3 = {
		name: "State of a component",
		exercises: 14,
	};

	const parts = [part1, part2, part3];
	// const excercises = [exercises1, exercises2, exercises3];

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	);
};

export default App;
