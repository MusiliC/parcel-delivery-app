const mongoose = require("mongoose");

const connectDB = async () => {
  try {
     mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
