import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [server,setServer]= useState("https://chat-room-be.herokuapp.com")
  return (
    <div className="header">
      <form>
        <label className="form">
          User:
          <input type="text" name="name" className="input"/>
        </label>
        <label className="form">
          Chat Server:
          {/* Test connect to demo chat server */}
          <input type="text" name="server" className="input" value={server} onChange={(e) => setServer(e.target.value)}/>
        </label>
        <input type="submit" value="Connect"/>
        </form>
        <hr/>
    </div>
  );
}

export default App;
