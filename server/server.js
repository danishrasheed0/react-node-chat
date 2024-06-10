const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const connectDb = require("./db/connectDb");

// uncaughtException
process.on("uncaughtException", (err) => {
  console.log("uncaughtException : ", err.name, err.message);
});

// Require app
const app = require("./app");

// Connect DB

connectDb();

// Listen Server
const port = process.env.PORT || 4001;
const fn = () => {
  console.log(`Server is listing on ${port} port`);
};
const server = app.listen(port, fn);

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection : ", error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});
