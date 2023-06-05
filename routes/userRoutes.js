const express = require("express");
const router = express.Router();

const {    getAllUser,
    getSingleUser,
    showCurrentUser,
    updateUser,
    deleteUser } = require("../controllers/userController");

    router
    .route("/")
    .get(getAllUser);
  
  router.route("/showMe/:id").get(showCurrentUser);
  router.route("/update-user/:id").patch(updateUser);
  router.route("/delete-user/:id").delete(deleteUser);
  
  router.route("/:id").get(getSingleUser);
  
  module.exports = router;