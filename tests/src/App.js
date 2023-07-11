import { useState, useEffect } from "react";

import Note from "./components/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
	// const { notes } = props;
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState("a new note...");
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const addNote = (event) => {
		event.preventDefault();
		// console.log("button clicked", event.target);
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote("");
		});
	};

	const handleNoteChange = (event) => {
		// console.log(event.target.value);
		setNewNote(event.target.value);
	};

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)));
			})
			.catch(() => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				"loggedNoteAppUser",
				JSON.stringify(user)
			);
			noteService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (e) {
			setErrorMessage("Wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		setUser(null);
		noteService.setToken(null);
		window.localStorage.removeItem("loggedNoteAppUser");
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username{" "}
				<input
					type="text"
					value={username}
					name="Username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
			</div>
			<div>
				password{" "}
				<input
					type="password"
					value={password}
					name="Password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);

	const noteForm = () => (
		<form onSubmit={addNote}>
			<input value={newNote} onChange={handleNoteChange} />
			<button type="submit">save</button>
		</form>
	);

	const Footer = () => {
		const footerStyle = {
			color: "green",
			fontStyle: "italic",
			fontSize: 16,
		};
		return (
			<div style={footerStyle}>
				{" "}
				<br />{" "}
				<em>
					Note app, Department of Computer Science, University of
					Helsinki 2022
				</em>{" "}
			</div>
		);
	};

	return (
		<div>
			<h1>Notes!</h1>
			<Notification message={errorMessage} />

			{!user ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in{" "}
						<button onClick={handleLogout}>logout</button>
					</p>
					{noteForm()}
				</div>
			)}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>

			<Footer />
		</div>
	);
};

export default App;
