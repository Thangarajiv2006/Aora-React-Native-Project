const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const session = require("express-session");

//Data Base Connection conection

mongoose
  .connect(process.env.MongoDB)
  .then(() => console.log("Database connected sucessfully"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "Aora",
    resave: true,
    saveUninitialized: false,
  })
);

const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//Api Routes

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
