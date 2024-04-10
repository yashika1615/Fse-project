import express from "express";
import { loginUser, registerUser } from "../controller/user.controller.js";
const router = express.Router();

router.post("/user", registerUser);
router.get("/user", loginUser);

export { router };
