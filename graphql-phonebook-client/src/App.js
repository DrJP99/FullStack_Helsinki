import { useApolloClient, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null
	}

	return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
	const [token, setToken] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)

	const result = useQuery(ALL_PERSONS, {})
	const client = useApolloClient()

	if (result.loading) {
		return <div>loading...</div>
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	const notify = (message) => {
		console.log(message)
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)
	}

	if (!token) {
		return (
			<div>
				<Notify errorMessage={errorMessage} />
				<h2>Login</h2>
				<LoginForm setToken={setToken} setError={notify} />
			</div>
		)
	}

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<button onClick={logout}>logout</button>
			<PersonForm setError={notify} />
			<Persons persons={result.data.allPersons} />
			<PhoneForm setError={notify} />
		</div>
	)
}

export default App
