const express = require("express");
const { TaskModel } = require("../model/task.model");

const taskRouter = express.Router();

taskRouter.post("/add", async (req, res) => {
  try {
    const { title, description, status, subtask } = req.body;
    const task = new TaskModel.create({ title, description, status, subtask });
    await task.save();
    res.status(200).json({ msg: "New task Added" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});


module.exports = { taskRouter };
