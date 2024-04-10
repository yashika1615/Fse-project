import mongoose from "mongoose";
import express from "express";
import { Product } from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const Allproducts = await Product.find();
    if (Allproducts == null) {
      res.status(401).send("Something went wrong");
    } else {
      res.status(400).json({
        success: true,
        products: Allproducts,
        message: "All products found",
      });
    }
  } catch (error) {
    res.status(501).send(`Something went wrong ${error}`);
  }
};

const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const ProductDetails = await Product.find({ productID: productId });
    if (ProductDetails != null) {
      res.status(200).json(ProductDetails);
    } else {
      res.status(401).send("Cannot find product");
    }
  } catch (error) {
    res.status(501).send("Something went wrong");
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      success: true,
      product: newProduct,
      message: "New Product created",
    });
  } catch (error) {
    res.status(501).send("Something went wrong");
  }
};

export { getProductDetails, createProduct, getAllProducts };
