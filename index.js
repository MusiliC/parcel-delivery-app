const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();

//routes

app.use("/users", require("./routes/userRoutes"));
app.use("/parcels", require("./routes/parcelRoutes"));

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

mongoose.set("strictQuery", false);

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo db connection established");
  })
  .catch((error) => {
    console.error("Mongodb connection failed:", error.message);
  });
