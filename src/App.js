import React, { useState } from 'react';
import {SocketContext, socket} from './socket';
import Map from './components/Map.jsx';
import Dialog from './components/Dialog.jsx';
import Chat from './components/Chat.jsx';
import './index.css';


function App() {

  return (
    <SocketContext.Provider value={socket}>
      <div className="container">
        <div className="uno">
          <Map
          />
        </div>
        <div className="dos">
          <Chat
          />
        </div>
        <div className="tres">
          <Dialog
          />
        </div>

      </div>
    </SocketContext.Provider>
  );
}

export default App;
