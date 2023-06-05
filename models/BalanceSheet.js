const mongoose = require("mongoose");

const SingleTransactionItemSchema = mongoose.Schema({
  transaction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Transaction',
    required: true,
  },
});

const BalanceSheetSchema = mongoose.Schema(
  {
    priceByPerson: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    TransactionItems: [SingleTransactionItemSchema],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BalanceSheet", BalanceSheetSchema);
