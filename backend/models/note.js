const mongoose = require("mongoose");
// require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;

console.log("connecting to ", url);

mongoose
	.connect(url)
	.then((res) => {
		console.log("Connected to MongoDB successfully!");
	})
	.catch((e) => {
		console.log("Could not connect to MongoDB: ", e.message);
	});

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},
	important: Boolean,
});

noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Note", noteSchema);
