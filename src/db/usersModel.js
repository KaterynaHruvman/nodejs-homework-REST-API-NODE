const mongoose = require("mongoose");
const gr = require("gravatar");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  idCloudAvatar: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: nanoid[(true, "Verify token is required")],
  },
});
userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = bcrypt.hash(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
