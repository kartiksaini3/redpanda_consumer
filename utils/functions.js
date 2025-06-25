import { ConsumerInfoMap } from "./constants.js";

export const runConsumer = async (route, kafka, customFnc) => {
  const { topic, groupId } = ConsumerInfoMap[route];

  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const val = message.value.toString();
      customFnc(val);
    },
  });
};

export const getUrl = (req) => req.url.replace("/", "");

export const commonConsumerListenerCallback = (topic, val) => {
  console.log(`${topic} : ${val}`);
};

export const commonConsumerReturnedJSON = (topic) => ({
  message: `Now listening to ${topic} topic`,
});
