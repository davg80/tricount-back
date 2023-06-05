const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router
  .route("/")
  .post(createTransaction)
  .get(getAllTransaction);

router
  .route("/:id")
  .get(getSingleTransaction)
  .patch(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;