const express = require("express");
const router = express.Router();

const {
    createBalanceSheet,
    getBalanceSheet,
    getSingleBalanceSheet,
    updateBalanceSheet,
    deleteBalanceSheet,
} = require("../controllers/balanceSheetController");


router
  .route("/").post(createBalanceSheet)
  .get(getBalanceSheet);

router
  .route("/:id")
  .get(getSingleBalanceSheet)
  .patch(updateBalanceSheet)
  .delete(deleteBalanceSheet);

module.exports = router;