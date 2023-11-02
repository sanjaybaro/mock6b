const express = require("express");
const { BoardModel } = require("../model/board.model");
const { TaskModel } = require("../model/task.model");
const { SubtaskModel } = require("../model/subtask.model");
const mongoose = require("mongoose");

const boardRouter = express.Router();

boardRouter.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    const board = new BoardModel({ name });
    await board.save();
    res.status(200).json({ msg: "New Board Added" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

boardRouter.get("/", async (req, res) => {
  try {
    const board = await BoardModel.find();
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

boardRouter.post("/:boardId/tasks", async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const { title, description, status } = req.body;
    const board = await BoardModel.findById(boardId);
    const task = new TaskModel({ title, description, status, board: boardId });
    board.tasks.push(task);
    await task.save();
    await board.save();
    res.status(200).json({ msg: "new Task added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

boardRouter.post("/tasks/:tasksId/subtasks", async (req, res) => {
  try {
    const tasksId = req.params.tasksId;
    const { title, isCompleted } = req.body;
    const task = await TaskModel.findById(tasksId);
    const sub = new SubtaskModel({ title, isCompleted });
    task.subtask.push(sub);
    await sub.save();
    await task.save();
    res.status(200).json({ msg: "new subtask added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { boardRouter };
