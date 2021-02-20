const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const EventSource = require("eventsource");

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
    const evtSource = new EventSource("http://localhost:3000/", { withCredentials: true } );
    evtSource.onmessage = function(event) {
        const newElement = document.createElement("li");
        const eventList = document.getElementById("list");

        newElement.textContent = "message: " + event.data;
        eventList.appendChild(newElement);
        console.log(eventList)
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})