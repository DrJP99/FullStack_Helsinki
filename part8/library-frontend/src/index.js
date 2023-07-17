import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache(),
})

client.query({ query: ALL_AUTHORS }).then((res) => console.log(res.data))
client.query({ query: ALL_BOOKS }).then((res) => console.log(res.data))

ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
