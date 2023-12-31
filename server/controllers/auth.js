const e = require("express");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        errors: [{ field: "email", message: "Email already exists" }],
      });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await user.save();

    return res.status(200).json({
      message: "SignUp Successful",
      errors: [],
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      let result = user.authenticate(password);
      console.log("result", result);

      if (result) {
        return res.status(200).json({
          message: "SignIn Successful",
          errors: [],
        });
      }
    }

    return res.status(400).json({
      errors: [
        { field: "email", message: "Invalid Credentials" },
        { field: "password", message: "Invalid Credentials" },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};
