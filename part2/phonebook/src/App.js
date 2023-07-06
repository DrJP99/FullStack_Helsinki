import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleNameChange = (event) => {
		// console.log(event.target.value);
		setNewName(event.target.value);
	};

	const handleNameSubmit = (event) => {
		event.preventDefault();

		// console.log("name submitted:", newName);
		if (!checkIfSaved(newName)) {
			const newPersonObject = {
				name: newName,
			};
			setPersons(persons.concat(newPersonObject));
			setNewName("");
		} else {
			console.log("Already saved that guy");
			window.alert(`${newName} is already added to phonebook`);
		}
	};

	const checkIfSaved = (name) => {
		const res = persons.filter((person) => person.name === name);
		return res.length > 0;
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleNameSubmit}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<div key={person.name}>{person.name}</div>
			))}
		</div>
	);
};

export default App;
