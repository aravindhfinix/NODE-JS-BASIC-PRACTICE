import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  journal: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
  },
  rented: {
    type: Boolean,
    default: false,
  },
  bought: {
    type: Boolean,
    default: false,
  },
  rented_date: {
    type: String,
  },
  returned_date: {
    type: String,
  },
  returned: {
    type: Boolean,
    default: true,
  },
});

export const Book = mongoose.model("book", BookSchema);
