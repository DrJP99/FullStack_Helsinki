import { useState } from "react";

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const avg = (good - bad) / all;
	const pos = (good / all) * 100;

	if (good === 0 && neutral === 0 && bad === 0) {
		return <p>No feedback given</p>;
	}

	return (
		<>
			<table>
				<tbody>
					<StaticLine text={"good"} value={good} />
					<StaticLine text={"neutral"} value={neutral} />
					<StaticLine text={"bad"} value={bad} />
					<StaticLine text={"all"} value={all} />
					<StaticLine text={"average"} value={avg} />
					<StaticLine text={"positive"} value={pos + "%"} />
				</tbody>
			</table>
		</>
	);
};

const StaticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleRate = (rating) => {
		if (rating === "good") {
			return () => setGood(good + 1);
		} else if (rating === "neutral") {
			return () => setNeutral(neutral + 1);
		} else if (rating === "bad") {
			return () => setBad(bad + 1);
		}
	};

	return (
		<div>
			<h1>Give feedback</h1>
			<Button handleClick={handleRate("good")} text={"good"} />
			<Button handleClick={handleRate("neutral")} text={"neutral"} />
			<Button handleClick={handleRate("bad")} text={"bad"} />
			<h2>statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
