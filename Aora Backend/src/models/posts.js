const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    video: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userData",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
