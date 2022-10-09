const app = require('express')();
const EventEmitter = require("events")
const emitter = new EventEmitter()
emitter.on("error", function(error) {
    console.log(error)
})
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;
const { join } = require("path")

io.on('connection', (socket) => {
    console.log('user connected');
    // socket.on("message", function message(msg) {
    //     console.log(msg)
    // })
    socket.on("message", (data) => {
        const packet = JSON.parse(data);
        console.log(packet)
        switch (packet.type) {
            case "hello from client":
                // ...
                break;
        }
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
})
app.get('/', function(req, res) {
    res.sendFile(join(__dirname, "index.html"));
});
server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});