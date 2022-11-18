const { socketInit } = require("./socket/socket.io-helper");
const { server } = require('./server/server');

socketInit();

server.listen(3000, () => {
    console.log('server is up and running.......');
})