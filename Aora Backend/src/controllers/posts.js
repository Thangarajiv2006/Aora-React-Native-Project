const upload = require("../utils/multer");
const posts = require("../models/posts");

const createPosts = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ errorCode: 500, errorMessage: "Files not upload" });
    }
    const video = req.files.video[0];
    const thumbnail = req.files.thumbnail[0];

    console.log(req.body);

    const data = {
      title: req.body.title,
      prompt: req.body.prompt,
      video: video.filename,
      thumbnail: thumbnail.filename,
      createdBy: req.body.createdBy,
    };

    posts
      .create(data)
      .then((post) => {
        return res.status(201).json(post);
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(200)
          .json({ errorCode: 300, errorMessage: "Data base not connected" });
      });
  });
};

module.exports = { createPosts };
