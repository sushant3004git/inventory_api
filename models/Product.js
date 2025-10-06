import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    stock_quantity: { type: Number, required: true, min: 0 },
    low_stock_threshold: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
