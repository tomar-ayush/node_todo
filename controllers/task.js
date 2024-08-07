import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import ErrorHandler from "../middlewares/error.js"

export const addTask = async (req, res, next) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task added successfully",
  });
};

export const getMyTask = async (req, res, next) => {
  const userid = req.user._id;

  const tasks = await Task.find({ user: userid });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  const { taskid } = req.params;

  const task = await Task.findById(taskid);

  if (!task) return next(new ErrorHandler("Invalid Id", 400));

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task Updated",
  });
};

export const deleteTask = async (req, res, next) => {
  const { taskid } = req.params;

  const task = await Task.findById(taskid);

  if (!task) return next(new ErrorHandler("Invalid Id", 404));
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task Deleted",
  });
};
