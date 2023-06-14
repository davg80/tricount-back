const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Merci de renseigner le nom de la catégorie"],
    maxlength: [100, "Le nom ne peut exceder 100 caractères."],
  },
  description: {
    type: String,
    required: [true, "Merci de renseigner la description de la catégorie"],
    maxlength: [1000, "Le nom ne peut exceder 1000 caractères."],
  },
  priceTotal: {
    type: Number,
    required: [true, "Merci de renseigner le prix de la catégorie"],
    default: 0,
  },
  atMyExpense: {
    type: Number,
    default: 0,
  },
  motto: {
    type: String,
    required: [true, "Merci de renseigner la devise de la catégorie"],
    enum: ["$", "€", "¥", "£"],
  },
  transactions: [{type: mongoose.Schema.Types.ObjectId, ref: "Transaction"}],
  attendee: {
    type: mongoose.Types.ObjectId,
    ref: "Attendee",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
