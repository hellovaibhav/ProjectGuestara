import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  taxApplicability: {
    type: Boolean,
    default: false
  },
  tax: {
    type: Number,
    default: 0
  },
  taxType: {
    type: String
  },
  deletedAt: {
    type: Date,
    default:null
  }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);