const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const connectDB = require("./config/db");
const router = require("./router/user");
const cluster = require("cluster");
const os = require("os");
const http = require("http");
import sockets from "./socket/socket";

const cpu = os.cpus().length;

app.use(cors());

app.use(express.json());
connectDB();

app.use("/", router);
const server = http.createServer(app);

if (cluster.isMaster) {
  for (let i = 0; i < cpu; i++) {
    cluster.fork();
  }
} else {
  sockets(server);
  server.listen(PORT, () => {
    console.log("Server is up and running " + PORT);
  });
}
