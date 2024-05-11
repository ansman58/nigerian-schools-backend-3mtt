import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    studentCount: Number,
    schoolImage: String,
    meta: String,
  },
  {
    timestamps: true,
  }
);

const School = model("School", schoolSchema);

export default School;
