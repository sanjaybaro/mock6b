const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: String,
  tasks: [{ type: String, ref: "Task" }],
});

const BoardModel = mongoose.model("board", boardSchema);

module.exports = { BoardModel };
