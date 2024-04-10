import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductDetails,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/products/:id", getProductDetails);
router.get("/Allproducts", getAllProducts);
router.post("/products", createProduct);

export { router };
