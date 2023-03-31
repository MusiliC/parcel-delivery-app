const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { validateParcel } = require("../helpers/parcelValidator");

const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");

//getParcels

const getParcels = asyncHandler(async (req, res) => {
  const parcels = await Parcel.find({}).lean();

  if (!parcels?.length) {
    return res.status(400).json({ message: "No parcels found" });
  }

  // Add username to each note before sending the response
  // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE
  // You could also do this with a for...of loop
  const parcelsWithSender = await Promise.all(
    parcels.map(async (parcel) => {
      const senderParcel = await User.findById(parcel.sender).lean().exec();
      return { ...parcel, sender: senderParcel.username };
    })
  );

  res.json(parcelsWithSender);
});

//create parcel

const createParcel = asyncHandler(async (req, res) => {
  const {
    parcel_label,
    sender,
    location_from,
    location_to,
    date_send,
    recipient_name,
    recipient_email,
    recipient_number,
    parcel_amount,
    isDelivered,
  } = req.body;

  const { error } = validateParcel(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create and store the new parcel

  const parcelObject = {
    parcel_label,
    sender,
    location_from,
    location_to,
    date_send,
    recipient_name,
    recipient_email,
    recipient_number,
    parcel_amount,
    isDelivered,
  };

  const parcel = await Parcel.create(parcelObject);

  if (parcel) {
    // Created
    return res.status(201).json({ message: "New parcel created" });
  } else {
    return res.status(400).json({ message: "Invalid parcel data received" });
  }
});

//one parcel

async function oneParcel(req, res) {
  try {
    const parcel = await Parcel.findById(req.params.id).populate("sender");
    if (!parcel) return res.status(404).send("Parcel not found..");
    res.status(200).send(parcel);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//update parcel
const updateParcel = asyncHandler(async (req, res) => {

  const {id} = req.params

  const {
   
    parcel_label,
    sender,
    location_from,
    location_to,
    date_send,
    recipient_name,
    recipient_email,
    recipient_number,
    parcel_amount,
    isDelivered,
  } = req.body;

  // Confirm data
  if ( 
    !parcel_label ||
    !sender ||
    !location_to ||
    !date_send ||
    !recipient_email ||
    !recipient_number ||
    !recipient_name ||
    !parcel_amount ||
    !location_from 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm parcel exists to update
  const parcel = await Parcel.findById(id).exec();

  if (!parcel) {
    return res.status(400).json({ message: "Parcel not found" });
  }

  parcel.parcel_label = parcel_label;
  parcel.sender = sender;
  parcel.location_from = location_from;
  parcel.location_to = location_to;
  parcel.date_send = date_send;
  parcel.recipient_name = recipient_name;
  parcel.recipient_number = recipient_number;
  parcel.recipient_email = recipient_email;
  parcel.parcel_amount = parcel_amount;
  parcel.isDelivered = isDelivered;

  const updatedParcel = await parcel.save();

  res.json(`'${updatedParcel.parcel_label}' updated`);
});

//delete parcel
const deleteParcel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Parcel ID required" });
  }

  const parcel = await Parcel.findById(id).exec();
  if (!parcel) return res.status(404).send("Parcel not found");

  const deleteAParcel = await Parcel.findByIdAndDelete(req.params.id);

  const reply = `Parcel '${deleteAParcel.parcel_label}' with ID ${deleteAParcel._id} deleted`;

  res.json(reply);
});

module.exports = {
  getParcels,
  createParcel,
  updateParcel,
  deleteParcel,
  oneParcel,
};
