const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "man.png",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userData = mongoose.model("userData", userSchema);

module.exports = userData;
