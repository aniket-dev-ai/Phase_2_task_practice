const express = require("express");
const app = express();

const userRouter = require("./Routes/UserRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

module.exports = app;
