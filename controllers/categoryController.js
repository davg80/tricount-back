const Category = require("../models/Category");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createCategory = async (req, res) => {
    req.body.atMyExpense = req.body.priceTotal/(req.body.attendees.length+1)
    const category = await Category.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .send({ msg: "Votre catégorie a bien été crée.", category: category });
  };
  
  const getAllCategory = async (req, res) => {
    const categories = await Category.find({}).populate(
      "attendees"
    ).populate(
      {path: "user", select: "firstname lastname"}
    );
    res
      .status(StatusCodes.OK)
      .json({ categories: categories, count: categories.length });
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
    const { name, description, priceTotal, motto, attendees } = req.body;
    const category = await Category.findOne({ _id: categoryId });
  
    if (!category) {
      throw new CustomError.NotFoundError(
        `La catégorie n'existe pas.`
      );
    }
    category.name = name;
    category.description = description;
    category.motto = motto;
    category.priceTotal = priceTotal;
    category.attendees = attendees;
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