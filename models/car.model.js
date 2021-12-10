const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const carSchema = new Schema({
  brand: { type: String, required: true }, // by Api
  model: { type: String, required: true }, // by Api
  overallTotalScore: { type: Number }, // calced by all the other ratings
  image: [{ type: String }], // by User input
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }], // ref all the ratings of this car
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
