const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/socket', (req, res) => {
    console.log("route hitted......")
    const { io } = require("socket.io-client");
    console.log("connecting......")
    var URL_SERVER = "http://localhost:3000/";
    var socket = io.connect(URL_SERVER);
    socket.on("message", function (data) {
        res.send(data); 
    });
})

module.exports = app  