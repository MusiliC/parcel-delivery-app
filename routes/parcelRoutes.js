const express = require("express");

const {
  createParcel,
  getParcels,
  updateParcel,
  deleteParcel,
  oneParcel,
} = require("../controllers/parcelController");

const router = express.Router();

router.post("/create", createParcel);
router.patch("/update/:id", updateParcel);
router.get("/", getParcels);
router.delete("/delete/:id", deleteParcel);
router.get("/:id", oneParcel);

module.exports = router;
