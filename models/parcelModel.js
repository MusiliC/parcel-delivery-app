const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema(
  {
    parcel_label: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location_from: {
      type: String,
      required: true,
    },
    location_to: {
      type: String,
      required: true,
    },
    date_send: {
      type: Date,
      required: true,
    },
    recipient_name: {
      type: String,
      required: true,
    },
    recipient_email: {
      type: String,
    },
    recipient_number: {
      type: String,
    },
    parcel_amount: {
      type: Number,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
