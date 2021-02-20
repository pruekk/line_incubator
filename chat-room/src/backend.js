const EventEmitter = require("eventemitter3")
const emitter = new EventEmitter()
const express = require("express")
const cors = require("cors")
var app = express()

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const subscribe = (req, res) => {
    res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
})
const onMessage = data => {
    if (!isEmpty(data)){
        const timestamp = new Date()
        const time = timestamp.getDate().toString() +" "+ monthNames[timestamp.getMonth()].toString() +" "+ timestamp.toLocaleTimeString().toString()
        data.time = time
        res.write(`data: ${JSON.stringify(data)}\n\n`)
    }
}
emitter.on("message", onMessage)
    req.on("close", function() {
        emitter.removeListener("message", onMessage)
    })
}
const publish = (req, res) => {
    emitter.emit("message", req.body)
    res.json({ message: "success" })
}
app.use(cors())
app.use(express.json())
app.post("/message", publish)
app.get("/message", subscribe)
app.listen(5000, () => {})