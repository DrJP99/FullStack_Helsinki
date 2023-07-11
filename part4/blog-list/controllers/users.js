const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		url: 1,
		title: 1,
		author: 1,
	})
	res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
	return await User.findById(req.params.id)
})

usersRouter.post('/', async (req, res) => {
	const { username, name, password } = req.body

	if (!password || password.length < 3) {
		res.status(400).json({
			error: 'password must be at least 3 characters long',
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	const user = new User({
		username,
		name,
		passwordHash: passwordHash,
	})

	console.log(user)

	const savedUser = await user.save()
	res.status(201).json(savedUser)
})

usersRouter.put('/:id', async (req, res) => {
	const { username, name, password } = req.body

	if (!password || password.length < 3) {
		res.status(400).json({
			error: 'password must be at least 3 characters long',
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const updatedUser = await User.findByIdAndUpdate(
		req.params.id,
		{
			username,
			name,
			passwordHash,
		},
		{ new: true, runValidators: 'query' }
	)
	res.json(updatedUser)
})

module.exports = usersRouter
