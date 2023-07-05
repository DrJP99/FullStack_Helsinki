const Header = (props) => {
	return <h1>{props.course}</h1>;
};

const Content = (props) => {
	const part1 = props.parts[0];
	const part2 = props.parts[1];
	const part3 = props.parts[2];

	const exercises1 = props.excercises[0];
	const exercises2 = props.excercises[1];
	const exercises3 = props.excercises[2];
	return (
		<>
			<p>
				{part1} {exercises1}
			</p>
			<p>
				{part2} {exercises2}
			</p>
			<p>
				{part3} {exercises3}
			</p>
		</>
	);
};

const Total = (props) => {
	let total = 0;
	props.excercises.forEach((element) => {
		total += element;
	});
	return <p>Number of exercises {total}</p>;
};

const App = () => {
	const course = "Half Stack application development";
	const part1 = "Fundamentals of React";
	const exercises1 = 10;
	const part2 = "Using props to pass data";
	const exercises2 = 7;
	const part3 = "State of a component";
	const exercises3 = 14;

	const parts = [part1, part2, part3];
	const excercises = [exercises1, exercises2, exercises3];

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} excercises={excercises} />
			<Total excercises={excercises} />
		</div>
	);
};

export default App;
