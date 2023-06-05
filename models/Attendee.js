const mongoose = require("mongoose");

const AttendeeSchema = mongoose.Schema({
  lastname: {
    type: String,
    required: [true, "Merci de préciser un nom du participant"],
    minlength: 3,
    maxlength: 50,
  },
  firstname: {
    type: String,
    required: [true, "Merci de préciser un prénom du participant"],
    minlength: 3,
    maxlength: 50,
  },
  status: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Attendee", AttendeeSchema);