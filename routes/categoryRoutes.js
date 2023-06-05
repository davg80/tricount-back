const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router
  .route("/")
  .post(createCategory)
  .get(getAllCategory);

router
  .route("/:id")
  .get(getSingleCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;