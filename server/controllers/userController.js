const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynchandler = require("express-async-handler");
const User = require("../models/userModel");





const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asynchandler(async (req, res) => {
  const {email, password} = req.body

  //Check for user email
  const user = await User.findOne({email})
  if(user && (await bcrypt.compare(password,user.password))){
    res.json ({
      _id:user.id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error("Invalid Credentials")
  }
});

const getMe = asynchandler(async (req, res) => {
  res.json({message:"User data display"})
});

const JWT = "abc123"

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, JWT,{
    expiresIn:'30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
