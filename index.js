import { Kafka } from "kafkajs";
import express from "express";
import {
  commonConsumerListenerCallback,
  commonConsumerReturnedJSON,
  getUrl,
  runConsumer,
} from "./utils/functions.js";
import { ConsumerInfoMap, ENV } from "./utils/constants.js";

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: "express-app",
  brokers: ["localhost:9092"],
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

  await runConsumer(url, kafka, (val) =>
    commonConsumerListenerCallback(topic, val)
  );

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

app.listen(ENV.PORT, () => {
  console.log(`Consumers running on port ${ENV.PORT}`);
});
