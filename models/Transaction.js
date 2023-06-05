const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const TransactionSchema = new moongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Merci de renseigner le titre de la transaction"],
      maxlength: [100, "Le nom ne peut exceder 100 caractères."],
    },
    price: {
      type: Number,
      required: [true, "Merci de renseigner le prix de la transaction"],
      default: 0,
    },
    typeTransaction: {
      type: String,
      required: [true, "Merci de renseigner le type de la transaction"],
      enum: {
        values: ["Dépenses", "Rentrée argent", "Transfert argent"],
        message: "{VALUE} n'est pas supporté",
      },
    },
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
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);