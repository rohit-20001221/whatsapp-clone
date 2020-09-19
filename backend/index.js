const express = require("express");
const apiRouter = require("./routes/api");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const Room = require("./models/Room");
const cors = require("cors");
require("dotenv").config();

//app config
const dbString = process.env.MONGO_URL;

const app = express();
mongoose.connect(dbString);
mongoose.Promise = global.Promise;

//middlewares
app.use(
  cors({
    origin: "https://whatsapp-clone-b59ad.web.app",
  })
);
app.use(express.json()); // <-- data is in req.body variable
app.use("/uploads", express.static("uploads")); // <-- make uploads folder public
app.use("/api", apiRouter);
app.use("/users", userRouter);

//listen
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(socket.id);
});

//listen for database streams
const roomStream = Room.watch();
roomStream.on("change", (change) => {
  console.log(change);

  try {
    const id = change.documentKey._id;
    if (change.updateDescription.updatedFields) {
      io.emit("newMessage", { id: id });
    }
  } catch (error) {}
});
