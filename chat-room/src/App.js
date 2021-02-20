import React, { useState } from 'react';
import './App.css';

const axios = require('axios');

const App = () => {
  const [name,setName] = useState("pruek")
  const [server,setServer]= useState("https://chat-room-be.herokuapp.com/message")
  const [connectStatus,setConnectStatus] = useState("Connect")
  const [message,setMessage] = useState([])
  const evtSource = new EventSource(server, { withCredentials: true } );
  async function connectServer(){
    console.log("connect to server...")
    await axios.post(server,{
      user: name,
      message: `Connected to ${server}`
    }).then((res) => {
        console.log(res.statusText)
        if (res.statusText === "OK"){
          setConnectStatus("Disconnect")
        }
    }).catch((err) => {
        console.log(err)
    })
  }
  async function getMessageFromServer(){
    evtSource.onmessage = function(event) {
      const newElement = document.createElement("li");
      const eventList = document.getElementById("list");

      newElement.textContent = "message: " + event.data;
      eventList.appendChild(newElement);
      console.log(eventList)
    }
    await axios.get(server)
      .then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
  }
  async function sendMessageToServer(){
    const jsonData = JSON.stringify({
      "user": name,
      "message": message
    });
    await axios.post(server,jsonData,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="header">
      <form>
        <label className="form">
          User:
          <input type="text" name="name" className="input" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label className="form">
          Chat Server:
          {/* Test connect to demo chat server */}
          <input type="text" name="server" className="input" value={server} onChange={(e) => setServer(e.target.value)}/>
        </label>
        <input type="submit" value={connectStatus} onClick={connectServer()}/>
        {/* <button onClick={getMessageFromServer()}>test evtSource</button> */}
        </form>
        <hr/>
        <div>
          {message}
        </div>
        {connectStatus === "Disconnect" ? 
          <div>
            <label className="form">
              User:
              <input type="text" name="name" className="input" placeholder="Say something here" onChange={(e) => setMessage(e.target.va)}/>
            </label>
            <input type="submit" value="send" onClick={sendMessageToServer()}/>
          </div> : null  
        }
    </div>
  );
}

export default App;
