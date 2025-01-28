const User = require("../Models/User");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    if (!email || !password || !username) {
      return res.json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id, user.username);
    res.cookie("token", token, {
      withCredentials: true,
      // httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: "none", // For cross-origin requests (if necessary)
      maxAge: 12 * 60 * 60 * 1000, // Cookie expiry
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id, user.username);
    res.cookie("token", token, {
      withCredentials: true,
      // httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: "none", // For cross-origin requests (if necessary)
      maxAge: 12 * 60 * 60 * 1000, // Cookie expiry
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};