require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
const userRoute = require("./route/userRoute");
const notificationRoute = require("./route/notificationRoute");
const productRoute = require("./route/ProductRoute");
const orderRoute = require("./route/OrderRoute");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = process.env.CLIENT_URL

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
}));

// app.use((req, res, next) => {
//   console.log("Origin:", req.headers.origin);
//   next();
// });

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/notification", notificationRoute);

app.get('/', (req, res) => console.log('Success'));

app.use(errorHandler);

connectDb();

mongoose.connection.once('open', () => {
    console.log('DataBase Connected!');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})