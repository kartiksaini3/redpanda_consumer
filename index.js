import "dotenv/config";
import { Kafka } from "kafkajs";
import express from "express";
import { Pool } from "pg";
import {
  commonConsumerListenerCallback,
  commonConsumerReturnedJSON,
  getUrl,
  runConsumer,
} from "./utils/functions.js";
import { ConsumerInfoMap } from "./utils/constants.js";
import { createTables } from "./db.js";

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: "express-app",
  brokers: ["localhost:9092"],
});

// ENVs
const port = +process.env.PORT || 4000;
const dbConnectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: dbConnectionString,
});

app.get("/consumer-1", async (req, res) => {
  const url = getUrl(req);
  const { topic } = ConsumerInfoMap[url];

  await runConsumer(url, kafka, (val) =>
    commonConsumerListenerCallback(topic, val)
  );

  res.json(commonConsumerReturnedJSON(topic));
});

app.get("/consumer-2", async (req, res) => {
  const url = getUrl(req);
  const { topic } = ConsumerInfoMap[url];

  await runConsumer(url, kafka, (val) => {
    console.log("blockInfo", JSON.parse(val));

    commonConsumerListenerCallback(topic, val);
  });

  res.json(commonConsumerReturnedJSON(topic));
});

app.get("/consumer-3", async (req, res) => {
  const url = getUrl(req);
  const { topic } = ConsumerInfoMap[url];

  await runConsumer(url, kafka, (val) =>
    commonConsumerListenerCallback(topic, val)
  );

  res.json(commonConsumerReturnedJSON(topic));
});

app.listen(port, async () => {
  await createTables(pool);
  console.log(`Consumers running on port ${port}`);
});
