const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  remark: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  uniqueid: {
    type: String,
    required: true,
    trim: true,
  },
  totalscore: {
    type: Number,
    trim: true,
  },
  login_type: {
    type: String,
    enum: ["Bed-Ridden", "Normal"],
    trim: true,
  },
  options: {
    type: [
      {
        questionId: {
          type: String,
          required: true,
          trim: true,
        },
        selectedOptionScore: {
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
