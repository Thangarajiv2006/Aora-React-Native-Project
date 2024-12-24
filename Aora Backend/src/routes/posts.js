const { createPosts } = require("../controllers/posts");
const { isLogined } = require("../middlewares/isLogined");
const posts = require("../models/posts");

const router = require("express").Router();

router.post("/create", createPosts);

router.post("/get", async (req, res) => {
  const { start, end, type, userId } = req.body;
  let data;

  switch (type) {
    case "all":
      data = await posts
        .find()
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(end)
        .populate("createdBy")
        .catch(() => {
          res
            .status(200)
            .json({ errorCode: 300, errorMessage: "Data base not connected" });
        });
      break;

    case "user":
      data = await posts
        .find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(end)
        .populate("createdBy")
        .catch(() => {
          res
            .status(200)
            .json({ errorCode: 300, errorMessage: "Data base not connected" });
        });
      break;
    case "refreshAll":
      data = await posts
        .find()
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(end)
        .populate("createdBy")
        .catch(() => {
          res
            .status(200)
            .json({ errorCode: 300, errorMessage: "Data base not connected" });
        });
      break;
    case "refreshUser":
      data = await posts
        .find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(end)
        .populate("createdBy")
        .catch(() => {
          res
            .status(200)
            .json({ errorCode: 300, errorMessage: "Data base not connected" });
        });
      break;
  }
  res.status(200).json(data);
});

module.exports = router;
