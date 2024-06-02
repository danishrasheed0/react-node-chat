const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });


// uncaughtException
process.on('uncaughtException', (err) => {
  console.log('uncaughtException : ',err.name, err.message)
})


// Require app
const app = require("./app");

// Connect DB

const db = process.env.db || "mongodb://127.0.0.1/real-time-chat";
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(db, dbOptions)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err.name, err.message));

// Listen Server
const port = process.env.PORT || 4001;
const fn = () => {
  console.log(`Server is listing on ${port} port`);
};

const server = app.listen(port, fn);

// Unhandled Rejection
process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection : ',error.name, error.message)
  server.close(() => {
    process.exit(1)
  })
})
