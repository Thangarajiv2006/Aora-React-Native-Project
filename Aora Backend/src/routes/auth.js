const route = require("express").Router();
const { signUp, login } = require("../controllers/auth");

route.post("/sign-up", signUp);

route.post("/login", login);

module.exports = route;
