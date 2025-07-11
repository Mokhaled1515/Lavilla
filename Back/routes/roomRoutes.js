const { Router } = require("express");
// const { auth } = require("../middleware/auth");
const {
  getRomms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { auth } = require("../middleware/auth");

const router = Router();

//get all rooms
router.get("/", getRomms);

//create room
router.post("/", auth, createRoom);

//get single room
router.get("/:id", getRoom);

//update room
router.put("/:id", auth, updateRoom);

//delete room
router.delete("/:id", auth, deleteRoom);

module.exports = router;
