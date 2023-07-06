import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-1234567" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const handleChange = (type) => {
		if (type === "name") {
			return (event) => setNewName(event.target.value);
		} else if (type === "number") {
			return (event) => setNewNumber(event.target.value);
		}
	};

	const handleNameSubmit = (event) => {
		event.preventDefault();

		// console.log("name submitted:", newName);
		if (!checkIfSaved(newName)) {
			const newPersonObject = {
				name: newName,
				number: newNumber,
			};
			setPersons(persons.concat(newPersonObject));
			setNewName("");
		} else {
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
					name:{" "}
					<input value={newName} onChange={handleChange("name")} />
				</div>
				<div>
					number:{" "}
					<input
						value={newNumber}
						onChange={handleChange("number")}
					/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<div key={person.name}>
					{person.name} ({person.number})
				</div>
			))}
		</div>
	);
};

export default App;
