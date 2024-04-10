import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productID: {
      type: Number,
      unique: true,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productBrand: {
      type: String,
      required: true,
    },
    productPricing: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: {
        color: { type: String },
        measurements: { type: String },
        category: { type: String },
        MfdOn: {
          type: Date,
        },
      },
      required: true,
    },
  },
  { Timestamp: true }
);

const Product = mongoose.model("Product", productSchema);

export { Product };
