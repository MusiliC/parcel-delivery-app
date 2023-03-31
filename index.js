const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const path = require("path");
const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const {logEvents} = require("./middlewares/logger")
const connectDB = require("./config/dbConnection")
const corsOptions = require("./config/corsOptions");
const app = express();
require("dotenv").config();

connectDB()


app.use(cors(corsOptions));
app.use(express.json());

app.use(cookieParser())

app.use(logger)




//routes
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));



app.use("/users", require("./routes/userRoutes"));
app.use("/parcels", require("./routes/parcelRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// const connection_string = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 5000;

app.use(errorHandler)


mongoose.set("strictQuery", false);

mongoose.connection.once("open", () => {

  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}.`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no} : ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
