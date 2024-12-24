const userData = require("../models/auth");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  const existUserData = await userData
    .findOne({ email: email })
    .catch((error) => {
      return res.status(200).json({ errorCode: 300 });
    });

  if (existUserData) {
    console.log("User Aldready Exist");
    return res.status(200).json({ errorCode: 301 });
  } else {
    const encryptedPassword = await bcrypt.hash(password, 5);
    userData
      .create({ email: email, password: encryptedPassword, name: name })
      .then((data) => {
        console.log(data);
        return res.status(201).json(data);
      })
      .catch(() => {
        return res.status(200).json({ errorCode: 300 });
      });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email.trim() && password.trim()) {
    const existEmail = await userData.findOne({ email: email });
    console.log(existEmail);
    if (existEmail) {
      const checkPassword = await bcrypt.compare(password, existEmail.password);
      if (checkPassword) {
        return res.status(200).json(existEmail);
      } else {
        return res
          .status(200)
          .json({ errorCode: 101, errMessage: "Credetial Failed" });
      }
    } else {
      return res
        .status(200)
        .json({ errorCode: 101, errMessage: "Credetial Failed" });
    }
  } else {
    return res
      .status(200)
      .json({ errorCode: 100, errMessage: "Fill all Details" });
  }
};

module.exports = { signUp, login };
