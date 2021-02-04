import mongoose from "mongoose";
import random from "mongoose-simple-random";
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  body: String,
  author: String
});
quoteSchema.plugin(random);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
