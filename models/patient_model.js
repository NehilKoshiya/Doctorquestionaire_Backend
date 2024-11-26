const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
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
      default: 0,
    },
    patient_type: {
      type: String,
      enum: ["BedRidden", "Normal"],
      trim: true,
      default: "Normal",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
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

module.exports = mongoose.model("Patient", patientSchema);
