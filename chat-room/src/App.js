import React, { useState, useEffect } from 'react';
import './App.css';

const axios = require('axios');

const App = () => {
  const [name,setName] = useState("pruek")
  const [server,setServer]= useState("https://chat-room-be.herokuapp.com")
  const [connectStatus,setConnectStatus] = useState("Connect")
  const [message,setMessage] = useState([])
  async function connectServer(){
    console.log("in")
    await axios.post("https://chat-room-be.herokuapp.com/message",{
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
        </form>
        <hr/>
        <div>
          {message}
        </div>
        {connectStatus === "Disconnect" ? 
          <div>
            <label className="form">
              User:
              <input type="text" name="name" className="input" placeholder="Say something here"/>
            </label>
            <input type="submit" value="send"/>
          </div> : null  
        }
    </div>
  );
}

export default App;
