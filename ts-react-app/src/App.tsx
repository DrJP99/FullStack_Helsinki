import React from 'react';
import PropTypes from 'prop-types';

interface WelcomeProps {
	name: string;
}

const Welcome = (props: WelcomeProps) => {
	return <h1>Hello, {props.name}</h1>;
};

function App() {
	return (
		<div className='App'>
			<Welcome name='John' />
		</div>
	);
}

export default App;
