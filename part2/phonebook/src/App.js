import { useState } from "react";

const Filter = ({ search, handleChange }) => {
	return (
		<p>
			filter shown with{" "}
			<input value={search} onChange={handleChange("search")} />
		</p>
	);
};

const Form = ({ newName, newNumber, handleChange, handleNameSubmit }) => {
	return (
		<form onSubmit={handleNameSubmit}>
			<div>
				name: <input value={newName} onChange={handleChange("name")} />
			</div>
			<div>
				number:{" "}
				<input value={newNumber} onChange={handleChange("number")} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ searchResults }) => {
	return (
		<div>
			{searchResults().map((person) => (
				<div key={person.id}>
					{person.name} ({person.number})
				</div>
			))}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");

	const handleChange = (type) => {
		if (type === "name") {
			return (event) => setNewName(event.target.value);
		} else if (type === "number") {
			return (event) => setNewNumber(event.target.value);
		} else if (type === "search") {
			return (event) => setSearch(event.target.value);
		}
	};

	const handleNameSubmit = (event) => {
		event.preventDefault();

		// console.log("name submitted:", newName);
		if (!checkIfSaved(newName)) {
			const newPersonObject = {
				name: newName,
				number: newNumber,
				id: persons.length + 1,
			};
			setPersons(persons.concat(newPersonObject));
			setNewName("");
			setNewNumber("");
		} else {
			window.alert(`${newName} is already added to phonebook`);
		}
	};

	const checkIfSaved = (name) => {
		const res = persons.filter((person) => person.name === name);
		return res.length > 0;
	};

	const searchResults = () => {
		return persons.filter((person) => person.name.includes(search));
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter search={search} handleChange={handleChange} />
			<h2>Add a new person</h2>
			<Form
				newName={newName}
				newNumber={newNumber}
				handleChange={handleChange}
				handleNameSubmit={handleNameSubmit}
			/>
			<h2>Numbers</h2>
			<Persons searchResults={searchResults} />
		</div>
	);
};

export default App;
