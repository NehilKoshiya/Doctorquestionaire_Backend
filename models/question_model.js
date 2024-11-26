const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        score: {
          type: Number,
          required: true,
          trim: true,
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Question", questionSchema);
