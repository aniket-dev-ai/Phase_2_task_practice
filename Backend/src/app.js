const express = require("express");
const app = express();

const userRouter = require("./Routes/UserRoute");
const PostRouter = require("./Routes/PostRoute.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post", PostRouter);

module.exports = app;
