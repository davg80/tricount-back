const Category = require("../models/Category");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Attendee = require("../models/Attendee");

const createCategory = async (req, res) => {
  const category = await Category.create(req.body)
  res
    .status(StatusCodes.CREATED)
    .send({ msg: "Votre catégorie a bien été crée.", category: category });
  };
  
  const getAllCategory = async (req, res) => {
    const categories = await Category.find({}).populate(
      "attendee"
    ).populate(
      {path: "user", select: "_id firstname lastname"}
    );  
    res
      .status(StatusCodes.OK)
      .json({ categories: categories });
  };
  
  const getSingleCategory = async (req, res) => {
    const { id: categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId }).populate(
      {path: "user", select: "firstname lastname"}
    );
  
    if (!category) {
      throw new CustomError.NotFoundError(
        `La catégorie n'existe pas.`
      );
    }
  
    res.status(StatusCodes.OK).json({ category });
  };
  
  const updateCategory = async (req, res) => {
    const { id: categoryId } = req.params;
    const { name, description, priceTotal, motto, attendees, user } = req.body;
    const category = await Category.findOne({ _id: categoryId });
    const ArrayAttendees = await Attendee.find({user: req.body.user, status: true});
    console.log(ArrayAttendees.length); 
    const nbTotalAttendees = ArrayAttendees.length
    if (!category) {
      throw new CustomError.NotFoundError(
        `La catégorie n'existe pas.`
      );
    }
    category.name = name;
    category.description = description;
    category.motto = motto;
    category.priceTotal = priceTotal;
    category.atMyExpense = priceTotal/nbTotalAttendees
    category.attendees = attendees;
    category.user = user;
    await category.save();
    res
      .status(StatusCodes.OK)
      .json({ msg: "Votre catégorie a été modifiée avec succes." });
  };
  
  const deleteCategory = async (req, res) => {
    const { id: categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
  
    if (!category) {
      throw new CustomError.NotFoundError(
        `La catégorie n'existe pas.`
      );
    }
  
    await Category.deleteOne({ _id: categoryId });
    res
      .status(StatusCodes.OK)
      .json({ msg: "Votre catégorie a été supprimée avec succes." });
  };
  
  module.exports = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
  };