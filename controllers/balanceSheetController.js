const BalanceSheet = require("../models/BalanceSheet");
const Transaction = require("../models/Transaction");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createBalanceSheet = async (req, res) => {
  const { items: transactionItems, user: userId} = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('Pas de transactions pour le moment.');
  }
  let items = [];
  let total = 0;
  for (const item of transactionItems) {
    const dbTransaction = await Transaction.findOne({_id: item.transaction}).populate('transaction');
    if(!dbTransaction) {
      throw new CustomError.NotFoundError(
        `Pas de transaction avec l'id : ${item.transaction}`
      )
    }
    items = [...items, dbTransaction]
    total += dbTransaction.price 
  }

  //Price par personne

};
const getBalanceSheet = async (req, res) => {
  console.log("Get All Balance sheet");
};
const getSingleBalanceSheet = async (req, res) => {
  console.log("Get single Balance sheet");
};

const updateBalanceSheet = async (req, res) => {
  console.log("Update single Balance sheet");
};

const deleteBalanceSheet = async (req, res) => {
  console.log("Delete single Balance sheet");
};

module.exports = {
  createBalanceSheet,
  getBalanceSheet,
  getSingleBalanceSheet,
  updateBalanceSheet,
  deleteBalanceSheet,
};
