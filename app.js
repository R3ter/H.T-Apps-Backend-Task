const express = require("express");
let data = require("./data");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send(data);
});

app.post("/", (req, res) => {
  data = req.body.data;
  res.send(true);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
