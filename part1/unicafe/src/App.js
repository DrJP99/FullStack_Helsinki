import { useState } from "react";

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Display = ({ good, neutral, bad }) => {
	return (
		<>
			<p>good: {good}</p>
			<p>neutral: {neutral} </p>
			<p>bad: {bad} </p>
		</>
	);
};

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
			<Display good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
