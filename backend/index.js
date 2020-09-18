const express = require("express");
const apiRouter = require("./routes/api");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
require("dotenv").config();

//app config
const dbString = process.env.MONGO_URL;

const app = express();
mongoose.connect(dbString);
mongoose.Promise = global.Promise;

//middlewares
app.use(express.json()); // <-- data is in req.body variable
app.use("/api", apiRouter);
app.use("/users", userRouter);

const jwtMiddleWare = require("./middleware/jwt");

//routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

//listen
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
