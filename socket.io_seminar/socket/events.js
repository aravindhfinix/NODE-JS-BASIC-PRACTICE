exports.SocketEventHandler = (io, socket) => {
    console.log(`A client connected to socket id ${socket.id}`);

    socket.on("ping", (msg) => {
        console.log(msg)
        socket.emit("pong",{event:"pong"})
    });

    socket.on("typing", (msg) => {
        console.log(msg)
        socket.emit("typing",{event:"typing"})
    });



    socket.on("disconnection", () => {
        console.log(
            `a user disconneted ${socket.handshake.query.id} with socket id ${socket.id} on ${Date.now()}`
        );
    });
}