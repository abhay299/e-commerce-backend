const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./db/conn");
const PORT = process.env.PORT || 5000;
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
// const User = require("./models/User");
// const Product = require("./models/Product");
// const Cart = require("./models/Cart");
// const Order = require("./models/Order");
// const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./routes/verifyToken");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

// dotenv.config();



// app.get("/api/test", () => {
// 	console.log("Test is successful!")
// })

// MIDDLEWARES
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Credentials", true);
// 	next();
// });

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

// Auth Api
// Register
// app.post("/api/auth/register", async (req, res) => {
// 	const newUser = new User({
// 		username: req.body.username,
// 		email: req.body.email,
// 		password: CryptoJS.AES.encrypt(
// 			req.body.password,
// 			process.env.PASS_SEC
// 		).toString(),
// 	});

// 	try {
// 		const savedUser = await newUser.save();
// 		res.status(201).json(savedUser);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// //Login
// app.post("/api/auth/login", async (req, res) => {
// 	try {
// 		// console.log("Im inside try block")
// 		const user = await User.findOne(
// 			{ username: req.body.username }
// 		);
// 		// Check if user exists
// 		if (!user) {
// 			return res.status(401).json("Wrong Credentials!");
// 		}
// 		// !user && res.status(401).json("Wrong User Name");
// 		// console.log("Username found: ", user.username);
// 		// console.log("Username entered: ", req.body.username);

// 		const hashPassword = CryptoJS.AES.decrypt(
// 			user.password,
// 			process.env.PASS_SEC
// 		);
// 		const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

// 		const { password, ...others } = user._doc;

// 		// Check Password
// 		if (originalPassword !== req.body.password) {
// 			return res.status(401).json("Wrong Credentials");
// 		} else {
// 			const accessToken = jwt.sign({
// 				id: user._id,
// 				isAdmin: user.isAdmin,
// 			},
// 				process.env.JWT_SEC,
// 				{ expiresIn: "5d" }
// 			);

// 			return res.status(200).json({ ...others, accessToken });
// 		}
// 	} catch (err) {
// 		// console.log('im in catch block:', err)
// 		res.status(500).json(err);
// 	}
// });
// // -------------------------Auth File---------------------------------- //
// // User Api
// app.put("/api/users/:id", verifyTokenAndAuthorization, async (req, res) => {
// 	if (req.body.password) {
// 		req.body.password = CryptoJS.AES.encrypt(
// 			req.body.password,
// 			process.env.PASS_SEC
// 		).toString();
// 	}

// 	try {
// 		const updatedUser = await User.findByIdAndUpdate
// 			(
// 				req.params.id,
// 				{
// 					$set: req.body
// 				},
// 				{
// 					new: true
// 				}
// 			);
// 		res.status(200).json(updatedUser);
// 	} catch (err) {
// 		console.log("Token Error: ", err);
// 		res.status(500).json(err);
// 	}
// });

// // Delete
// app.delete("/api/users/:id", verifyTokenAndAuthorization, async (req, res) => {
// 	try {
// 		await User.findByIdAndDelete(req.params.id);
// 		res.status(200).json("User has been deleted...")
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// })
//
// // Get User
// app.get("/api/users/find/:id", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		// res.status(200).json(user)
// 		const { password, ...others } = user._doc;
// 		res.status(200).json(others);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get All Users
// app.get("/api/users/", verifyTokenAndAdmin, async (req, res) => {
// 	const query = req.query.new
// 	try {
// 		const users = query
// 			? await User.find().sort({ _id: -1 }).limit(5)
// 			: await User.find();
// 		res.status(200).json(users);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get User Stats
// app.get("/api/users/stats", verifyTokenAndAdmin, async (req, res) => {
// 	const date = new Date();
// 	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

// 	try {
// 		const data = await User.aggregate([
// 			{ $match: { createdAt: { $gte: lastYear } } },
// 			{
// 				$project: {
// 					month: { $month: "$createdAt" },
// 				},
// 			},
// 			{
// 				$group: {
// 					_id: "$month",
// 					total: { $sum: 1 },
// 				},
// 			},
// 		]);
// 		res.status(200).json(data);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });
// // -------------------------User File---------------------------------- //
// // Product Api
// // Create
// app.post("/api/products/", verifyTokenAndAdmin, async (req, res) => {
// 	const newProduct = new Product(req.body);

// 	try {
// 		const savedProduct = await newProduct.save();
// 		res.status(200).json(savedProduct)
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Update
// app.put("/api/products/:id", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const updatedProduct = await Product.findByIdAndUpdate
// 			(
// 				req.params.id,
// 				{
// 					$set: req.body
// 				},
// 				{
// 					new: true
// 				}
// 			);
// 		res.status(200).json(updatedProduct);
// 	} catch (err) {
// 		console.log("Token Error: ", err);
// 		res.status(500).json(err);
// 	}
// });

// // Delete
// app.delete("/api/products/:id", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		await Product.findByIdAndDelete(req.params.id);
// 		res.status(200).json("Product has been deleted...")
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get Product
// app.get("/api/products/find/:id", async (req, res) => {
// 	try {
// 		const product = await Product.findById(req.params.id);
// 		res.status(200).json(product);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get All Products
// app.get("/api/products/", async (req, res) => {
// 	const queryNew = req.query.new;
// 	const queryCategory = req.query.category;

// 	try {
// 		let products;

// 		if (queryNew) {
// 			products = await Product.find().sort({ createdAt: -1 }).limit(5);
// 		} else if (queryCategory) {
// 			products = await Product.find({
// 				categories: {
// 					$in: [queryCategory],
// 				},
// 			});
// 		} else {
// 			products = await Product.find();
// 		}

// 		res.status(200).json(products);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });
// // -------------------------Product File---------------------------------- //
// // Cart Api
// // Create
// app.post("/api/carts/", verifyToken, async (req, res) => {
// 	const newCart = new Cart(req.body);

// 	try {
// 		const savedCart = await newCart.save();
// 		res.status(200).json(savedCart);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Update
// app.put("/api/carts/:id", verifyTokenAndAuthorization, async (req, res) => {
// 	try {
// 		const updatedCart = await Cart.findByIdAndUpdate
// 			(
// 				req.params.id,
// 				{
// 					$set: req.body
// 				},
// 				{
// 					new: true
// 				}
// 			);
// 		res.status(200).json(updatedCart);
// 	} catch (err) {
// 		console.log("Token Error: ", err);
// 		res.status(500).json(err);
// 	}
// });

// // Delete
// app.delete("/api/carts/:id", verifyTokenAndAuthorization, async (req, res) => {
// 	try {
// 		await Cart.findByIdAndDelete(req.params.id);
// 		res.status(200).json("Cart has been deleted...")
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get User Cart
// app.get("/api/carts/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
// 	try {
// 		const cart = await Cart.findOne({ userId: req.params.userId });
// 		res.status(200).json(cart);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get All Carts
// app.get("/api/carts/", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const carts = await Cart.find();
// 		res.status(200).json(carts);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// })
// // -------------------------Cart File---------------------------------- //
// // Order Api
// // Create
// app.post("/api/orders/", verifyToken, async (req, res) => {
// 	const newOrder = new Order(req.body);

// 	try {
// 		const savedOrder = await newOrder.save();
// 		res.status(200).json(savedOrder);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Update
// app.put("/api/orders/:id", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const updatedOrder = await Order.findByIdAndUpdate
// 			(
// 				req.params.id,
// 				{
// 					$set: req.body
// 				},
// 				{
// 					new: true
// 				}
// 			);
// 		res.status(200).json(updatedOrder);
// 	} catch (err) {
// 		console.log("Token Error: ", err);
// 		res.status(500).json(err);
// 	}
// });

// // Delete
// app.delete("/api/orders/:id", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		await Order.findByIdAndDelete(req.params.id);
// 		res.status(200).json("Order has been deleted...")
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get User Orders
// app.get("/api/orders/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
// 	try {
// 		const orders = await Order.find({ userId: req.params.userId });
// 		res.status(200).json(orders);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get All User Orders
// app.get("/api/orders/", verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const orders = await Order.find();
// 		res.status(200).json(orders);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get Monthly Income
// app.get("/api/orders/income", verifyTokenAndAdmin, async (req, res) => {
// 	const date = new Date();
// 	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
// 	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

// 	try {
// 		const income = await Order.aggregate([
// 			{ $match: { createdAt: { $gte: previousMonth } } },
// 			{
// 				$project: {
// 					month: { $month: "$createdAt" },
// 					sales: "$amount",
// 				},
// 			},
// 			{
// 				$group: {
// 					_id: "$month",
// 					total: { $sum: "$sales" },
// 				},
// 			},
// 		]);
// 		res.status(200).json(income);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });
// -------------------------Order File---------------------------------- //
// Stripe Api
// -------------------------Stripe File---------------------------------- //

app.listen(PORT, () => {
	console.log(`Backend server up and running at Port : ${PORT}`);
});