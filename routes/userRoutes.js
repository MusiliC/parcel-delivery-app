const express = require("express");

const {
  createUser,
  getUsers,
  signUser,
  deleteUser,
  oneUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/sign", signUser);
router.get("/", getUsers);
router.delete("/delete/:id", deleteUser);
router.get("/:id", oneUser);

module.exports = router;
