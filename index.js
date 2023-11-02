const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const cors = require("cors");
const { boardRouter } = require("./routes/board.router");
const { taskRouter } = require("./routes/task.router");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to the Homepage Kanban" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.use("/board", boardRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to the db");
    console.log("Server running on the port 8080");
  } catch (error) {
    console.log(error);
  }
});
