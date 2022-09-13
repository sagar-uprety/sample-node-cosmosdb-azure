const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const PORT = process.env.PORT || 4000;
const DB_String = process.env.CUSTOMCONNSTR_mongodb_url;

app.use("/", express.static(path.resolve(__dirname, "assets")));
app.use(bodyParser.json());

//Azure Cosmos DB Config
mongoose.connect(DB_String, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Read
app.get("/api/get", async (req, res) => {
  const records = await Todo.find({});
  console.log(process.env.CUSTOMCONNSTR_mongodb_url);
  res.json(records);
});

//Create Todos
app.post("/api/create", async (req, res) => {
  const record = req.body;
  console.log(record);

  const response = await Todo.create(record);
  console.log(response);

  res.json({ status: "Todo Created!" });
});

//Delete Todos
app.post("/api/delete", async (req, res) => {
  const { record } = req.body;
  console.log(record, "/api/delete");

  const response = await Todo.deleteOne({ record });

  console.log(response, "/api/delete repsonse");

  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
