const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: [true, "Merci de préciser un nom"],
    minlength: 3,
    maxlength: 50,
  },
  firstname: {
    type: String,
    required: [true, "Merci de préciser un prénom"],
    minlength: 3,
    maxlength: 50,
  },
  gender: {
    type: String,
    required: [true, "Merci de préciser un genre"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Merci de préciser un email"],
    validate: {
      validator: validator.isEmail,
      message: "Merci de préciser un email valide.",
    },
  },
  password: {
    type: String,
    required: [true, "Merci de préciser un mot de passe."],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if(!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (plainPassword) {
  const isMatch = await bcrypt.compare(plainPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);