const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required."],
			unique: [true, "Username is already taken."]
		},
		email: {
			type: String,
			required: true, unique: true
		},
		password: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		img: {
			type: String,
			default: "https://img.icons8.com/color/48/000000/circled-user-female-skin-type-1-2--v2.png"
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);