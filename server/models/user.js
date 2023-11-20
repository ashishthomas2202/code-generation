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
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullname").get(() => {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("password").set((password) => {
  this._password = password;
});

userSchema.pre("save", async (next) => {
  if (!this._password) {
    return next();
  }

  try {
    this.salt = await bcrypt.genSalt(10);
    this.hashedPassword = await this.encryptPassword(this._password, this.salt);
  } catch (error) {
    return next(error);
  }

  next();
});

userSchema.methods = {
  authenticate: async (password) => {
    this._password = this.encryptPassword(password, this.salt);
    return await bcrypt.compare(this._password, this.hashedPassword);
  },
  encryptPassword: async (password, salt) => {
    return await bcrypt.hash(password, salt);
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
