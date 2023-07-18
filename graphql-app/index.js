const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
require('dotenv').config()
const {
	ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const mongoose = require('mongoose')

const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((e) => {
		console.log('error connecting to MongoDB:', e.message)
	})

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/',
	})

	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const serverCleanup = useServer({ schema }, wsServer)

	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
	})

	await server.start()

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(
						auth.substring(7),
						process.env.JWT_SECRET
					)
					const currentUser = await User.findById(
						decodedToken.id
					).populate('friends')
					return { currentUser }
				}
			},
		})
	)

	const PORT = process.env.PORT

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on port ${PORT}`)
	)
}

start()
