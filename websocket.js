const WebSocket = require("ws")
const app = require("express")()
const server = require("http").createServer(app)
const { join } = require("path")
const httpServer = app.listen(4000, () => {
    console.log("app is running on port " + 4000)
})
const wss = new WebSocket.Server({ server: httpServer })
app.get('/', function(req, res) {
    res.sendFile(join(__dirname, "index.html"));
});
wss.getUniqueID = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};
wss.on("connection", function connection(socket) {
    console.log("new user connected  ")
    socket.send("welcome new client to the site a=hahah")
    socket.on("message", function incoming(message) {
        console.log("message from client is " + message)
    })
    socket.id = wss.getUniqueID();

    wss.clients.forEach(function each(client) {
        console.log('Client.ID: ' + client.id);
    });
})