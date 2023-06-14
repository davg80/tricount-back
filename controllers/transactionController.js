const Transaction = require("../models/Transaction");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Category = require("../models/Category");
const Attendee = require("../models/Attendee");
const User = require("../models/User");

const createTransaction = async (req, res) => {
    const { category: categoryId } = req.body;
    const oldCategory = await Category.findOne({ _id: categoryId });

    if (!oldCategory) {
      throw new CustomError.NotFoundError(`Cette catégorie n'existe pas.`);
    }

    if(oldCategory.attendee.toString() === req.body.attendee) {
      throw new CustomError.BadRequestError(
        "Ce participant a créé cette catégorie et ne peut pas faire de transaction."
      );
    }
  
    const alreadySubmitted = await Transaction.findOne({
      category: categoryId,
      attendee: req.body.attendee
    });
    
    if (alreadySubmitted) {
      throw new CustomError.BadRequestError(
        "Ce participant a déjà effectué sa transaction pour cette catégorie."
      );
    }
    const { title, price, typeTransaction, attendee, category, user } = req.body;
    const newTransaction = { title: title, price: price, typeTransaction: typeTransaction, attendee: attendee, category: category, user: user }
    
    const transaction = await Transaction.create(newTransaction);
    const attendeeBD = await Attendee.findOne({ _id: transaction.attendee });
    const userBD = await User.findOne({ _id: transaction.user }).select("-password");
    const categoryDB = await Category.findOne({_id: transaction.category})

    transaction.attendee = attendeeBD
    transaction.user = userBD
    transaction.category = categoryDB

    res.status(StatusCodes.CREATED).json({
      msg: "Votre transaction a bien été crée.",
      transaction: transaction,
    });
  };
  
  const getAllTransaction = async (req, res) => {
    const transactions = await Transaction.find({})
      .populate("attendee")
    .populate({ path: "user", select: "_id firstname lastname" })
      .populate({ path: "category", select: "_id name description motto" });
    res
      .status(StatusCodes.OK)
      .json({ transactions: transactions, count: transactions.length });
  };
  
  const getSingleTransaction = async (req, res) => {
    const { id: transactionId } = req.params;
    const transaction = await Transaction.findOne({ _id: transactionId })
     .populate("attendee")
    .populate({ path: "user", select: "_id firstname lastname" })
      .populate({ path: "category", select: "name description motto" });
  
    if (!transaction) {
      throw new CustomError.NotFoundError(
        `La transaction n'existe pas.`
      );
    }
  
    res.status(StatusCodes.OK).json({ transaction });
  };
  
  const updateTransaction = async (req, res) => {
    const { id: transactionId } = req.params;
    const { title, price, typeTransaction, attendee, category } = req.body;
    const transaction = await Transaction.findOne({ _id: transactionId });

    if (!transaction) {
      throw new CustomError.NotFoundError(
        `La transaction n'existe pas.`
      );
    }
    
    transaction._id = transactionId;
    transaction.title = title;
    transaction.price = price;
    transaction.typeTransaction = typeTransaction;
    transaction.attendee = attendee;
    transaction.category = category;
    await transaction.save();

    const attendeeBD = await Attendee.findOne({ _id: category.attendee });
    const userBD = await User.findOne({ _id: category.user }).select("-password");
    transaction.attendee = attendeeBD
    transaction.user = userBD
    res
      .status(StatusCodes.OK)
      .json({ msg: "Votre transaction a été modifié avec succés.", transaction: transaction});
  };
  
  const deleteTransaction = async (req, res) => {
    const { id: transactionId } = req.params;
    const transaction = await Transaction.findOne({ _id: transactionId });
  
    if (!transaction) {
      throw new CustomError.NotFoundError(
        `La transaction n'existe pas.`
      );
    }
    
    await Transaction.deleteOne({ _id: transactionId });
    res
      .status(StatusCodes.OK)
      .json({ msg: "Votre transaction a été supprimée avec succés." });
  };
  
  module.exports = {
    createTransaction,
    getAllTransaction,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction,
  };