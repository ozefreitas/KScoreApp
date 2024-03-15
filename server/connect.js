const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;
const app = express();
const Db = process.env.ATLAS_URI;
const corsOptions = { origin: "http://localhost:3000" };

async function main() {
  const client = new MongoClient(Db);
  await client.connect();
  app.use(express.json());
  app.use(cors(corsOptions));

  app.get("/api/competitors", async (req, res) => {
    const db = client.db("CompetitorData");
    const collection = db.collection("Competitor");
    const data = await collection.find({}).toArray();
    res.json(data);
  });

  app.get("/api/kataname", async (req, res) => {
    const db = client.db("CompetitorData");
    const collection = db.collection("Kata");
    const data = await collection.find({}).toArray();
    res.json(data);
  });

  // app.get("/", (req, res) => {
  //   res.send("Hello World");
  // });

  app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
  });
}

// async function main() {
//   const Db = process.env.ATLAS_URI;
//   const client = new MongoClient(Db);

//   try {
//     await client.connect();
//     const collection = await client
//       .db("CompetitorData")
//       .collection("Competitor")
//       .find()
//       .toArray();

//     console.log(collection);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

main();
