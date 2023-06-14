const Attendee = require("../models/Attendee");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createAttendee = async (req, res) => {
  const attendee = await Attendee.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .send({ msg: "Votre participant a bien été crée.", attendee: attendee });
};

const getAllAttendee = async (req, res) => {
  const attendees = await Attendee.find({});
  attendees.count = await Attendee.find({}).count()
  res.status(StatusCodes.OK).json({ attendees: attendees });
};

const getSingleAttendee = async (req, res) => {
  const { id: attendeeId } = req.params;
  const attendee = await Attendee.findOne({ _id: attendeeId });

  if (!attendee) {
    throw new CustomError.NotFoundError(
      `Le participant n'existe pas.`
    );
  }

  res.status(StatusCodes.OK).json({ attendee });
};

const updateAttendee = async (req, res) => {
  const { id: attendeeId } = req.params;
  const { firstname, lastname, status } = req.body;
  const attendee = await Attendee.findOne({ _id: attendeeId });

  if (!attendee) {
    throw new CustomError.NotFoundError(
      `Le participant n'existe pas.`
    );
  }
  
  attendee.firstname = firstname;
  attendee.lastname = lastname;
  attendee.status = status;
  await attendee.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Votre participant a été modifié avec succès." });
};

const deleteAttendee = async (req, res) => {
  const { id: attendeeId } = req.params;
  const attendee = await Attendee.findOne({ _id: attendeeId });

  if (!attendee) {
    throw new CustomError.NotFoundError(
      `Le participant n'existe pas.`
    );
  }
 
  await Attendee.deleteOne({ _id: attendeeId });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Votre participant a été supprimé avec succès." });
};

module.exports = {
  createAttendee,
  getAllAttendee,
  getSingleAttendee,
  updateAttendee,
  deleteAttendee,
};