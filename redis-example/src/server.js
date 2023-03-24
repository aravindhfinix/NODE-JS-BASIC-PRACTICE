import express from "express";
const app = express();
const PORT = 8000;
import { createClient } from "redis";
import Redis from "ioredis";
import { connectDB } from "./config/db";
import { router } from "./router/router";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/", router);

// export let client;

export const redis = new Redis();

// redis.config("SET", "maxmemory", 10);

redis.config("SET", "maxmemory-policy", "allkeys-lru");

// (async () => {
//   client = createClient();

//   client.on("error", (err) => {
//     console.log(err);
//   });

//   await client.connect();

//   const info = await client.info();
//   // console.log(info);

//   console.log("connected");
// })();

app.listen(PORT, () => {
  console.log("Server is up and running");
});
