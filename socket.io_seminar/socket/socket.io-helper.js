const { server } = require('../server/server');
const { SocketEventHandler } = require('./events')
exports.socketInit = () => {

    var io = require('socket.io')(server);
    console.log("socket is up runing...")
    /**
     * init socket.io server
     */
    io.on('connection', async (socket) => {
        console.log("new connection with socket", socket.id, " with id", socket.handshake.query.id);
        SocketEventHandler(io,socket)
        socket.emit("message", {
            status: 1,
            message: "socket connection is up and running...",
            data: {},
        });
    });
} 
