const jwt = require("jsonwebtoken");

const isLogined = (req, res, next) => {
  console.log(req.userData);
  if (req.userData && req.userData._id) {
    next();
  }
  return res
    .status(200)
    .json({ errorCode: 301, errorMessage: "Autheriazation is required" });
};

module.exports = { isLogined };
