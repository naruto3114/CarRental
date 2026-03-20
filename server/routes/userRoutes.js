import express from "express";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouters = express.Router();

userRouters.post("/register", registerUser);
userRouters.post("/login", loginUser);
userRouters.get("/data", protect, getUserData);
userRouters.get("/cars",getCars);

export default userRouters;
