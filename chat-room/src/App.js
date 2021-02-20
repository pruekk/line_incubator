import React, { useEffect, useState } from 'react';
import './App.css';

const axios = require('axios');

const App = () => {
  const [name,setName] = useState("pruek")
  // const [server,setServer]= useState("https://chat-room-be.herokuapp.com/message")
  const [server,setServer]= useState("http://localhost:5000/message")
  const [connectStatus,setConnectStatus] = useState("Connect")
  const [message,setMessage] = useState("")
  const [msgServer,setMsgServer] = useState([])
  const connectServer = async () => {
    console.log("connect to server...")
    await axios.post(server).then((res) => {
        console.log(res.statusText)
        if (res.statusText === "OK"){
          setConnectStatus("Disconnect")
        }
    }).catch((err) => {
        console.log(err)
    })
  }
  const sendMessageToServer = async () =>{
    const jsonData = {
      "user": name,
      "message": message
    };
    await axios.post(server,jsonData)
      .then((res) => {
        console.log(res.statusText)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    const getMessageFromServer = () => {
      let source = new EventSource(server)
      source.onmessage = event => {
          const data = JSON.parse(event.data)
          if (Object.keys(data).length !== 0){
            const data = JSON.parse(event.data)
            setMsgServer(msgServer => msgServer.concat(data))
            // setMsgServer([...msgServer,data])
          }
      }
    }
    getMessageFromServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div className="header">
      <label className="form">
        User:
        <input type="text" name="name" className="input" value={name} onChange={(e) => setName(e.target.value)}/>
      </label>
      <label className="form">
        Chat Server:
        {/* Test connect to demo chat server */}
        <input type="text" name="server" className="input" value={server} onChange={(e) => setServer(e.target.value)}/>
      </label>
      <button onClick={() => connectServer()}>{connectStatus}</button>
      {/* <button onClick={getMessageFromServer()}>test evtSource</button> */}
      <hr/>
      <div>
        {msgServer.map((msg,index) => {
          return <li key={index}>{msg.time.toString()} - {msg.user} : {msg.message}</li>
        })}
      </div>
      {connectStatus === "Disconnect" ? 
        <div className="footer">
          <label className="form">
            Message:
            <input type="text" name="name" className="input" placeholder="Say something here" onChange={(e) => setMessage(e.target.value)}/>
          </label>
          <input type="submit" value="send" onClick={() => sendMessageToServer()}/>
        </div> : null  
      }
    </div>
  );
}

export default App;
