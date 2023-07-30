const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Login
router.post("/login", async (req, res) => {
	try {
		// console.log("Im inside try block")
		const user = await User.findOne(
			{ username: req.body.username }
		);
		// Check if user exists
		if (!user) {
			return res.status(401).json("Wrong Credentials!");
		}
		// !user && res.status(401).json("Wrong User Name");
		// console.log("Username found: ", user.username);
		// console.log("Username entered: ", req.body.username);

		const hashPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC
		);
		const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

		const { password, ...others } = user._doc;

		// Check Password
		if (originalPassword !== req.body.password) {
			return res.status(401).json("Wrong Credentials");
		} else {
			const accessToken = jwt.sign({
				id: user._id,
				isAdmin: user.isAdmin,
			},
				process.env.JWT_SEC,
				{ expiresIn: "5d" }
			);

			return res.status(200).json({ ...others, accessToken });
		}
	} catch (err) {
		// console.log('im in catch block:', err)
		res.status(500).json(err);
	}
});

module.exports = router;