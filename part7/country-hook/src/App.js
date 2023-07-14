import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange,
	}
}

const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

	const getCountry = async () => {
		//get country data
		try {
			const res = await axios.get(`${baseUrl}/${name}`)
			//if 200, set country
			console.log(res)
			const c = { ...res.data }
			setCountry({
				data: {
					name: c.name.common,
					capital: c.capital[0],
					population: c.population,
					flag: c.flags.png,
				},
				found: true,
			})
		} catch (e) {
			//if 404, set countr not found
			console.log(e.message)
			setCountry({ data: {}, found: false })
		}
	}

	useEffect(() => {
		if (name) {
			getCountry()
		}
	}, [name])

	return country
}

const Country = ({ country }) => {
	console.log(country)
	if (!country) {
		return null
	}

	if (!country.found) {
		return <div>not found...</div>
	}

	return (
		<div>
			<h3>{country.data.name} </h3>
			<div>capital {country.data.capital} </div>
			<div>population {country.data.population}</div>
			<img
				src={country.data.flag}
				height='100'
				alt={`flag of ${country.data.name}`}
			/>
		</div>
	)
}

const App = () => {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)

	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	)
}

export default App
