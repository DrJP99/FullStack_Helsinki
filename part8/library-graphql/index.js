const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
        author: String
        genre: String
        ): [Book!]!
    allAuthors: [Author!]!
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
		addBook: async (root, args) => {
			let new_author = await Author.findOne({ name: args.author })
			if (!new_author) {
				new_author = new Author({
					name: args.author,
				})

				await new_author.save()
			}

			const book = new Book({
				...args,
				author: new_author._id,
			})
			await book.save()
			console.log(book)
			return book
		},
		editAuthor: (root, args) => {
			const author = authors.find((a) => a.name === args.name)
			if (!author) {
				return null
			}

			const updatedAuthor = {
				...author,
				born: args.setBornTo,
			}

			authors = authors.map((a) =>
				a.name === updatedAuthor.name ? updatedAuthor : a
			)
			return updatedAuthor
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
