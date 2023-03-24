const socket = require("socket.io");

const sockets = (server) => {
  const Server = socket.Server;
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (Socket) => {
    console.log("connected");

    Socket.on("send_message", (data) => {
      Socket.emit("received_message", "hello");
      console.log(data.message);
    });

    Socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};

module.exports = sockets;
