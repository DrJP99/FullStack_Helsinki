const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
require('dotenv').config()

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

const typeDefs = `
type Author {
    name: String!
    born: Int
    bookCount: Int
	id: ID!
}

type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
	id: ID!
}

type User {
	username: String!
	favoriteGenre: String!
	id: ID!
}

type Token {
	value: String!
}

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
        author: String
        genre: String
        ): [Book!]!
    allAuthors: [Author!]!
	me: User
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book!
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
	createUser(
		username: String!
		favoriteGenre: String!
	): User
	login(
		username: String!
		password: String!
	): Token
  }
`

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			const author = await Author.findOne({
				name: args.author,
			})

			let new_list = await Book.find({})

			if (args.author) {
				new_list = new_list.filter(
					(book) => book.author.toString() === author._id.toString()
				)
			}
			if (args.genre) {
				new_list = new_list.filter((book) =>
					book.genres.includes(args.genre)
				)
			}
			return new_list
		},
		allAuthors: async () => await Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Book: {
		author: async (root) => {
			const id = root.author.toString()
			return await Author.findById(id)
		},
	},
	Author: {
		// bookCount: (root) => {
		// 	const author_books = books.filter(
		// 		(book) => book.author === root.name
		// 	)
		// 	return author_books.length
		// },
	},
	Mutation: {
		addBook: async (root, args, context) => {
			let new_author = await Author.findOne({ name: args.author })
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			if (!new_author) {
				try {
					new_author = new Author({
						name: args.author,
					})

					await new_author.save()
				} catch (error) {
					throw new GraphQLError('invalid author', {
						extensions: {
							code: 'BADE_USER_INPUT',
							invalidArgs: args.name,
							error,
						},
					})
				}
			}

			const book = new Book({
				...args,
				author: new_author._id,
			})
			try {
				await book.save()

				return book
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			}
		},
		editAuthor: async (root, args, context) => {
			const author = await Author.findOne({ name: args.name })

			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			if (!author || !args.setBornTo) {
				throw new GraphQLError('enter valid arguments', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			try {
				author.born = args.setBornTo
				console.log(author)
				await author.save()
			} catch (error) {
				throw new GraphQLError('enter valid arguments', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			}
			return author
		},
		createUser: async (root, args) => {
			const user = new User({
				...args,
			})

			return user.save().catch((error) => {
				throw new GraphQLError('Creating user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({
				username: args.username,
			})

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7),
				process.env.JWT_SECRET
			)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
