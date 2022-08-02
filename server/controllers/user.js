const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

const secret = "test";

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // console.log("hi", email, password);
  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(200).json({ error: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(200).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    return res.status(200).json({ error: "Something went wrong" });
  }
};

module.exports.signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    if (password !== confirmPassword)
      return res.status(200).json({ error: "passwords don't match" });
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(200).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: firstName + " " + lastName,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error.message });
  }
};
module.exports.forgetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword)
      return res.status(200).json({ error: "passwords don't match" });
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(200).json({ error: "User does not exist" });

    const hashedPassword = await bcrypt.hash(password, 12);
    oldUser.password = hashedPassword;
    await oldUser.save();
    res.status(200).json("sucess");
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error.message });
  }
};
