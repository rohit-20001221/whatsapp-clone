const express = require("express");
const router = express.Router();
const jwtMiddleware = require("../middleware/jwt");
const upload = require("../middleware/fileUpload");
const apiController = require("../controllers/api");

router.post(
  "/create/room",
  jwtMiddleware,
  upload.single("room_image"),
  apiController.createRoom
);
router.post("/add/room", jwtMiddleware, apiController.addToRoom);
router.get("/rooms", jwtMiddleware, apiController.getRooms);
router.post("/room/message/:roomId", jwtMiddleware, apiController.sendMessage);
router.get(
  "/room/message/:roomId/latest",
  jwtMiddleware,
  apiController.latestMessage
);

module.exports = router;
