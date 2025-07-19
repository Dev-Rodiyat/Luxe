require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./config/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");
const userRoute = require("./route/userRoute");
const expenseRoute = require("./route/expenseRoute");
const notificationRoute = require("./route/notificationRoute");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
  optionsSuccessStatus: 200,
}));

app.use("/user", userRoute);
app.use("/expense", expenseRoute);
app.use("/notification", notificationRoute);

app.get('/', (req, res) => console.log('Success'));

app.use(errorHandler);

connectDb();

mongoose.connection.once('open', () => {
    console.log('DataBase Connected!');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})