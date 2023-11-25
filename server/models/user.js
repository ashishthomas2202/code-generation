const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("password").set(function (password) {
  this._password = password;
});

userSchema.methods.encryptPassword = async function (password) {
  return await bcrypt.hash(password, this.salt);
};
userSchema.methods.authenticate = async function (password) {
  this._password = this.encryptPassword(password, this.salt);
  return await bcrypt.compare(this._password, this.hashedPassword);
};

userSchema.pre("save", async function (next) {
  if (!this._password) {
    return next();
  }

  try {
    this.salt = await bcrypt.genSalt(10);
    this.hashedPassword = await this.encryptPassword(this._password);
  } catch (error) {
    return next(error);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
