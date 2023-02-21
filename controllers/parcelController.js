const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validateParcel } = require("../helpers/parcelValidator");

const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");

//getParcels

async function getParcels(req, res) {
  try {
    const parcels = await Parcel.find({}).populate("sender");

    // const parcels = await Parcel.find({}).populate("sender");

    res.status(200).send(parcels);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//create parcel

async function createParcel(req, res) {
  const { error } = validateParcel(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
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

    parcel = new Parcel({
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
    });

    await parcel.save();

    const sender_ = await User.findById(sender);

    if (sender_) {
      await User.findByIdAndUpdate(sender, {
        $set: {
          parcels: [...sender_.parcels, parcel._id],
        },
      });
    }

    //   return success response
    res.status(200).send("Parcel created");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

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
async function updateParcel(req, res) {
  try {
    const parcelToUpdate = await Parcel.findById(req.params.id);
    if (!parcelToUpdate) return res.status(404).send("parcel not found..");

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

    const updatedParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      { new: true }
    );
    res.send(updatedParcel);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//delete parcel
async function deleteParcel(req, res) {
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) return res.status(404).send("parcel not found..");

    const deleteAParcel = await Parcel.findByIdAndDelete(req.params.id);

    // const sender_ = await User.findById(req.params.id);

    // if (sender_) {
    //   await User.findByIdAndUpdate({
    //     $set: {
    //       parcels: [...sender_.parcels, parcel._id],
    //     },
    //   });
    // }

    res.status(200).send({
      message: "Parcel deleted...",
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  getParcels,
  createParcel,
  updateParcel,
  deleteParcel,
  oneParcel,
};
