const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      minlength: 8,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    parcels: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Parcel",
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
