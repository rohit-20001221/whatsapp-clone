const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose");
require("dotenv").config();

//app config
const dbString = process.env.MONGO_URL;

const app = express();
mongoose.connect(dbString);
mongoose.Promise = global.Promise;

//middlewares
app.use(express.json()); // <-- data is in req.body variable
app.use("/api", router);

//routes
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

//error handling middleware
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(422).send({ error: err.message });
});

//listen
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
