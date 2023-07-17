import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './queries'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null
	}

	return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
	const result = useQuery(ALL_PERSONS, {})
	const [errorMessage, setErrorMessage] = useState(null)

	if (result.loading) {
		return <div>loading...</div>
	}

	const notify = (message) => {
		console.log(message)
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)
	}

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<PersonForm setError={notify} />
			<Persons persons={result.data.allPersons} />
			<PhoneForm setError={notify} />
		</div>
	)
}

export default App
