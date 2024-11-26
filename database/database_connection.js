const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("connected", function () {
  console.log("Mongoose default connection connected.");
});

db.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

db.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", function () {
  db.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
