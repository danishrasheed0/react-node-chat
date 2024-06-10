const mongoose = require("mongoose");

const connectDb = () => {
  const db = process.env.db || "mongodb://127.0.0.1/real-time-chat";

  const dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(db, dbOptions)
    .then((con) =>
      console.log("DB connected successfully", con.connection.host)
    )
    .catch((err) => console.log("Error : " + err.name, err.message));
};

module.exports = connectDb;
