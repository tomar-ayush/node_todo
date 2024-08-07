import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookie } from "../utils/features.js";
import ErrorHandler, { errorMiddleWare } from "../middlewares/error.js";

export const getallUsers = async (req, res) => {
  console.log("get user");
  res.json({
    status: true,
    message: "Give all users",
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);

    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    setCookie(user, res, "Registered Succesfully", 201);

  } catch (error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      next(new ErrorHandler("Invalid Username or Password"), 404);
    }

    setCookie(user, res, `Welcome Back, ${user.name}`, 200);

  } catch (error) {
    next(error)
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    status: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        status: true,
        message: "logged out succesfully",
      });
  } catch {
    console.log("Error while logging out");
  }
};
