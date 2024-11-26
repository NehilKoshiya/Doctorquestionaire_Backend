const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
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
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Question", questionSchema);
