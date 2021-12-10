const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true }, // by User input
  password: { type: String, required: true }, // by User input
  name: { type: String, required: true }, // by User input
  role: { type: String, enum: ["admin", "user"], default: "user" }, // default User, optional: may be changed by Admin
  image: { type: String, default: "https://i.imgur.com/w3UEu8o.jpeg" }, // default, can be changed by User ( upload)
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }], // ref to all the ratings by User
});

const User = mongoose.model("User", userSchema);

module.exports = User;
