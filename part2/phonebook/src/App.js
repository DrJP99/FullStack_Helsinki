import { useState, useEffect } from "react";

import Notification from "./components/Notification";
import personsService from "./services/persons";

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

const Persons = ({ searchResults, deletePerson }) => {
	return (
		<div>
			{searchResults().map((person) => (
				<div key={person.id}>
					{person.name} ({person.number}){" "}
					<button onClick={() => deletePerson(person.id)}>
						delete
					</button>
				</div>
			))}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [notificationMessage, setNotification] = useState(null);
	const [notificationType, setNotifType] = useState("success");

	useEffect(() => {
		personsService
			.getAll()
			.then((initialPersons) => setPersons(initialPersons));
	}, []);

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
				id: persons[persons.length - 1].id + 1,
			};

			personsService.create(newPersonObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNotifType("success");
				setNotification(`Added ${newName} to phonebook`);
				setNewName("");
				setNewNumber("");
				setTimeout(() => {
					setNotification(null);
				}, 5000);
			});
		} else {
			if (
				window.confirm(
					`${newName} is already added to your phonebook, would you like to replace the old number with the new one?`
				)
			) {
				const person = persons.find((p) => p.name === newName);
				const changedPerson = { ...person, number: newNumber };
				personsService
					.update(changedPerson.id, changedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((p) =>
								p.id === returnedPerson.id ? returnedPerson : p
							)
						);
						setNotifType("success");
						setNotification(
							`${newName} changed number to ${newNumber}`
						);
						setNewName("");
						setNewNumber("");
						setTimeout(() => {
							setNotification(null);
						}, 5000);
					});
			}
		}
	};

	const checkIfSaved = (name) => {
		const res = persons.filter((person) => person.name === name);
		return res.length > 0;
	};

	const searchResults = () => {
		return persons.filter((person) => person.name.includes(search));
	};

	const deletePerson = (id) => {
		const person_name = persons.filter((p) => p.id === id)[0].name;
		if (window.confirm(`Do you want to delete ${person_name}`)) {
			personsService
				.del(id)
				.then(() => {
					const new_list = persons.filter((p) => p.id !== id);
					setPersons(new_list);
				})
				.catch(() => {
					setNotifType("fail");
					setNotification(
						`Information on the person ${person_name} with id ${id} has been already removed from the server`
					);
					const new_list = persons.filter((p) => p.id !== id);
					setPersons(new_list);
					setTimeout(() => {
						setNotification(null);
					}, 5000);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				message={notificationMessage}
				type={notificationType}
			/>
			<Filter search={search} handleChange={handleChange} />
			<h2>Add a new person</h2>
			<Form
				newName={newName}
				newNumber={newNumber}
				handleChange={handleChange}
				handleNameSubmit={handleNameSubmit}
			/>
			<h2>Numbers</h2>
			<Persons
				searchResults={searchResults}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
