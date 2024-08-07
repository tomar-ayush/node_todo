import express from "express";
// import {  } from "../controllers/user.deleted.js";
import {
  getMyProfile,
  login,
  getallUsers,
  register,
  logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getallUsers);

router.post("/new", register);

router.post("/login", login);

router.get('/logout', logout)

router.get("/me", isAuthenticated, getMyProfile);

export default router;
