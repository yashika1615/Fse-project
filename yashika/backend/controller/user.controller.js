import express from "express";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    if (
      [userName, password, email].some((field) => {
        return field?.trim() == "";
      })
    ) {
      res.status(409).send("All fields are required");
    }

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      res.status(409).send("User Already Exists with same usernamer or email");
    } else {
      await User.create({
        userName,
        password,
        email,
      });
      res.status(201).send("User created successfully");
    }
  } catch (error) {
    res.status(501).send(`Something went wrong : ${error}`);
  }
};

const loginUser = async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
      res.status(409).send(" Please enter the details");
    }
    const existingUser = await User.findOne({ userName });

    if (!existingUser) {
      res.status(409).send("User doesn't exists");
    }
  } catch (error) {
    res.status(501).send(`An Error ocuured :${error}`);
  }
};

export { registerUser, loginUser };
