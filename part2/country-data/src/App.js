import { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ country, allCountries, showCountry }) => {
	const matching_names = allCountries();
	if (country === "" || country === null) {
		return <div>Type the name of a country</div>;
	}

	if (matching_names.length > 10) {
		return (
			<div>
				Too many matches, be more specific ({matching_names.length})
			</div>
		);
	}

	if (matching_names.length <= 10 && matching_names.length > 1) {
		return (
			<div>
				<ul>
					{matching_names.map((country) => (
						<li key={country.cioc}>
							{country.name.common}{" "}
							<button
								onClick={showCountry}
								value={country.name.common}
							>
								show
							</button>
						</li>
					))}
				</ul>
			</div>
		);
	}

	if (matching_names.length === 1) {
		const country = matching_names[0];
		console.log(country);
		return (
			<div>
				<h1>{country.name.common}</h1>
				<p>
					<b>Capital:</b> {country.capital}
				</p>
				<p>
					<b>Area:</b> {country.area}m^2
				</p>

				<h2>Languages:</h2>
				<ul>
					{Object.keys(country.languages).map((lang) => (
						<li key={lang}>{country.languages[lang]}</li>
					))}
				</ul>
				<img src={country.flags.png} alt={country.flag} />
			</div>
		);
	}
};

const App = () => {
	const [country, setCountry] = useState("");
	const [allCountries, setAllCountries] = useState([]);

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((res) => setAllCountries(res.data))
			.catch(() => {
				console.log("error fetching API");
			});
	}, []);

	const matching_names = () => {
		return allCountries.filter((c) =>
			c.name.common.toLowerCase().includes(country.toLowerCase())
		);
	};

	const select_country = (event) => {
		setCountry(event.target.value);
	};

	return (
		<div>
			<form>
				<p>
					Find countries{" "}
					<input
						onChange={(e) => setCountry(e.target.value)}
						value={country}
					/>
				</p>
			</form>
			<Display
				country={country}
				allCountries={matching_names}
				showCountry={select_country}
			/>
		</div>
	);
};

export default App;
