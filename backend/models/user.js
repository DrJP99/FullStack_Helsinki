const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 4,
		validate: {
			validator: (v) => {
				return /^(\d|[a-zA-Z])+(\d|[a-zA-Z]|\_|\@|\-)*$/.test(v);
			},
			message: (props) =>
				`${props.value} can only start with digits, letters and may use these special characters(_, -, @) and must be at least 4 characters long`,
		},
	},
	name: String,
	passwordHash: String,
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Note",
		},
	],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// pw hash should not be revealed
		delete returnedObject.passwordHash;
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
