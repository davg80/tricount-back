const express = require("express");
const router = express.Router();

const {
  createAttendee,
  getAllAttendee,
  getSingleAttendee,
  updateAttendee,
  deleteAttendee,
} = require("../controllers/attendeeController");


router
  .route("/").post(createAttendee)
  .get(getAllAttendee);

router
  .route("/:id")
  .get(getSingleAttendee)
  .patch(updateAttendee)
  .delete(deleteAttendee);

module.exports = router;