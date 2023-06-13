const Transaction = require("../models/Transaction");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Category = require("../models/Category");

const createTransaction = async (req, res) => {
    const { category: categoryId } = req.body;
    const isValidCategory = await Category.findOne({ _id: categoryId });
  
    if (!isValidCategory) {
      throw new CustomError.NotFoundError(`Cette catégorie n'existe pas.`);
    }
  
    const alreadySubmitted = await Transaction.findOne({
      category: categoryId,
      user: req.body.user,
    });
  
    if (alreadySubmitted) {
      throw new CustomError.BadRequestError(
        "Ce participant a déjà effectué sa transaction pour cette catégorie."
      );
    }
  
    const transaction = await Transaction.create(req.body);
    res.status(StatusCodes.CREATED).json({
      msg: "Votre transaction a bien été crée.",
      transaction: transaction,
    });
  };
  
  const getAllTransaction = async (req, res) => {
    const transactions = await Transaction.find({})
      .populate({ path: "attendee", select: "firstname lastname" })
      .populate({ path: "user", select: "firstname lastname" })
      .populate({ path: "category", select: "name description motto" });
    res
      .status(StatusCodes.OK)
      .json({ transactions: transactions, count: transactions.length });
  };
  
  const getSingleTransaction = async (req, res) => {
    const { id: transactionId } = req.params;
    const transaction = await Transaction.findOne({ _id: transactionId })
      .populate({ path: "attendee", select: "firstname lastname" })
      .populate({ path: "user", select: "firstname lastname" })
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