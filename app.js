const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

let data = require("./data");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const url =
  "mongodb+srv://waleedsukhon77:jw29XjVwKVConxiA@cluster0.ft0iwsn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });

async function startServer() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("test");
    const collection = db.collection("data");

    app.get("/", async (req, res) => {
      const result = await collection.findOne({
        _id: new ObjectId("656bfe9ccee859a0c11cf9c7"),
      });
      res.send(result.data.data);
    });

    app.post("/", async (req, res) => {
      console.log(req.body.data);
      const newData = req.body.data;
      await collection.updateOne(
        { _id: new ObjectId("656bfe9ccee859a0c11cf9c7") },
        { $set: { data: { data: newData } } }
      );
      res.send(true);
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
  }
}

startServer();
