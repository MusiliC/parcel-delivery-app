const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const { validateUser } = require("../helpers/userValidator");

const User = require("../models/userModel");
const Parcel = require("../models/parcelModel");

//getUsers

// async function getUsers(req, res) {
//   try {
//     const users = await User.find({})
//       .sort({
//         isAdmin: -1,
//       })
//       .populate("parcels");
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(500).send(error.message);
//     console.log(error);
//   }
// }

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password")
    .sort({
      isAdmin: -1,
    })
    .lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

//register user

// async function createUser(req, res) {
//   const { error } = validateUser(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   try {
//     const { username, email, number, password } = req.body;

//     //check if user exists
//     let user = await User.findOne({ email: req.body.email });
//     if (user) res.status(400).send("User with that email already exist..");

//     user = new User({
//       username,
//       email,
//       number,
//       password,
//     });

//     const salt = await bcrypt.genSalt(10);

//     user.password = await bcrypt.hash(user.password, salt);

//     await user.save();

//     //generating a token

//     const secretKey = process.env.SECRET_KEY;

//     const token = jwt.sign(
//       {
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       },
//       secretKey
//     );

//     //   return success response
//     res.status(200).send({
//       username: user.username,
//       id: user._id,
//       email: user.email,
//       number: user.number,
//       isAdmin: user.isAdmin,
//       token,
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//     console.log(error);
//   }
// }

const createUser = asyncHandler(async (req, res) => {
  //get data from client

  const { username, email, number, password, isAdmin } = req.body;

  //validate user
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exists
  let duplicateUser = await User.findOne({ email: req.body.email }).exec();
  if (duplicateUser)
    return res.status(409).send("User with that email already exist!");

  const salt = await bcrypt.genSalt(10);

  const hashedPwd = await bcrypt.hash(password, salt);

  const userObj = { username, email, number, password: hashedPwd, isAdmin };

  //create and store new user

  const user = User.create(userObj);

  if (user) {
    res.status(201).json({ message: `New user  ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

//sign user

async function signUser(req, res) {
  try {
    //check if user exists

    let user = await User.findOne({ email: req.body.email });
    if (!user) res.status(400).send("invalid email or password ..");

    //compare password

    const validUser = await bcrypt.compare(req.body.password, user.password);

    if (!validUser) return res.status(400).send("Invalid email or password..");

    //generating a token

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      secretKey
    );

    //   return success response
    res.status(200).send({
      username: user.username,
      id: user._id,
      email: user.email,
      number: user.number,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

//update user

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, email, number, password, isAdmin, isDelivered } =
    req.body;

  //confirm data

  if (!id || !username || !email || !number || typeof isAdmin !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check for duplicate

  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  //allows update to the original users

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email " });
  }

  user.username = username;
  user.email = email;
  user.number = number;
  user.isAdmin = isAdmin;

  if (password) {
    //hash password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await user.save();

  res.json({ message: `User ${updatedUser.username} updated` });
});

//delete user

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "user ID is required" });
  }

  const parcel = await Parcel.findOne({ sender: id }).lean().exec();

  if (parcel) {
    return res.status(400).json({ message: "User has assigned parcels" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

//one user

async function oneUser(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("parcels");
    if (!user) return res.status(404).send("User not found..");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
}

module.exports = {
  getUsers,
  createUser,
  signUser,
  deleteUser,
  oneUser,
  updateUser,
};
