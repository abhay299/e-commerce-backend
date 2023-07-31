const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./db/conn.js");
const PORT = process.env.PORT || 5000;
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

// dotenv.config();

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

app.listen(PORT, () => {
	console.log(`Backend server up and running at Port : ${PORT}`);
});