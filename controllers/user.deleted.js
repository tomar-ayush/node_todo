import { User } from "../models/user.js";

export const getallUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  User.create({
    name,
    email,
    password,
  });

  res.cookie("temp", "value").json({
    success: true,
    message: "User Registered Succesfully",
  });
};


export const getUserDetails = async (req, res) => {
  // const { id } = req.query;
  const { id } = req.params;

  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
};