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

const allowedOrigins = [
  process.env.CLIENT_URL || "https://trackfi-beta.vercel.app",
  "https://trackfi-beta.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: 'GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS',
}));

app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

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