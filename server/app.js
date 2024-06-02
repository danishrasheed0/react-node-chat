const express = require("express");
const AppError = require("./utils/app-error");
const STATUS_CODE = require("./constants/status-code");
const globalErrorHandler = require("./controllers/error-controller");
const app = express();
const cors = require('cors'); 
// Middlewares
app.use(express.json({ limit: '10kb' }))

const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


// Routes
const userRouter = require("./routes/user-router");

// Router Middlewares
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  let error = new AppError("Route not Found", STATUS_CODE.NOT_FOUND);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
