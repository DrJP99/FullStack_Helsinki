import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
	// const { notes } = props;
	const [notes, setNotes] = useState([])
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	const [user, setUser] = useState(null)

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	const noteFormRef = useRef()
	const noteForm = () => (
		<Togglable buttonLabel='new note' ref={noteFormRef}>
			<NoteForm createNote={addNote} />
		</Togglable>
	)

	const addNote = (noteObject) => {
		noteService.create(noteObject).then((returnedNote) => {
			noteFormRef.current.toggleVisibility()
			setNotes(notes.concat(returnedNote))
		})
	}

	const notesToShow = showAll ? notes : notes.filter((note) => note.important)

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((n) => (n.id !== id ? n : returnedNote)))
			})
			.catch(() => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter((n) => n.id !== id))
			})
	}

	const handleLogin = async (userObject) => {
		try {
			const user = await loginService.login(userObject)

			window.localStorage.setItem(
				'loggedNoteAppUser',
				JSON.stringify(user)
			)
			noteService.setToken(user.token)
			setUser(user)
			return true
		} catch (e) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			return false
		}
	}

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm handleLogin={handleLogin} />
		</Togglable>
	)

	const handleLogout = () => {
		setUser(null)
		noteService.setToken(null)
		window.localStorage.removeItem('loggedNoteAppUser')
	}

	const Footer = () => {
		const footerStyle = {
			color: 'green',
			fontStyle: 'italic',
			fontSize: 16,
		}
		return (
			<div style={footerStyle}>
				{' '}
				<br />{' '}
				<em>
					Note app, Department of Computer Science, University of
					Helsinki 2022
				</em>{' '}
			</div>
		)
	}

	return (
		<div>
			<h1>Notes!</h1>
			<Notification message={errorMessage} />

			{!user ? (
				loginForm()
			) : (
				<div>
					<p>
						{user.name} logged in{' '}
						<button onClick={handleLogout}>logout</button>
					</p>
					{noteForm()}
				</div>
			)}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
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
	)
}

export default App
