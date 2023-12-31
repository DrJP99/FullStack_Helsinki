import { useState } from "react";

const Button = ({ clickHandler, text }) => (
	<button onClick={clickHandler}>{text}</button>
);

const App = () => {
	const random = (min, max) => {
		//Excludes max
		const new_max = max - min;

		return Math.floor(Math.random() * new_max) + min;
	};

	const handleVote = () => {
		const copy = { ...votes };
		copy[selected] = copy[selected] + 1;
		setVotes(copy);

		// console.log(copy);
		// console.log("selected", selected);
		// console.log("max index", mostVoted);

		if (copy[selected] > copy[mostVoted] && selected !== mostVoted) {
			// console.log(copy[selected], "is bigger than", copy[mostVoted]);
			setMost(selected);
		}
	};

	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	let init_votes = {};
	let i = 0;
	for (const anecdote in anecdotes) {
		init_votes[i] = 0;
		i++;
	}

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(init_votes);

	const [mostVoted, setMost] = useState(0);

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<Button clickHandler={handleVote} text={"vote"} />
			<Button
				clickHandler={() => setSelected(random(0, anecdotes.length))}
				text={"next anecdote"}
			/>

			<h1>Anecdote with most votes</h1>
			<p>{anecdotes[mostVoted]}</p>
			<p>has {votes[mostVoted]} votes</p>
		</div>
	);
};

export default App;
