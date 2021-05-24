import '../messages.css';
import ChatBack from '../chat-back';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from '../socket';
import socketIOClient from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:4000';
// const SOCKET_SERVER_URL = 'http://tarea-3-websocket.2021-1.tallerdeintegracion.cl';
// const NEW_CHAT_MESSAGE_EVENT = 'CHAT';

const Chat = (props) => {
  const { messageObjects, sendMessageObject } = ChatBack(); // Creates a websocket and manages messaging

  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  const [nickName, setNickName] = useState(''); // Message to be sent
  // const nickName = 'Agustín Espíldora';

  const handleNewMessageChange = (event) => {
    // Checks wether the change was becouse of an Enter key press event,
    // so the newMessage Variable dos not update itsvalue
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessageObject(nickName, newMessage);
    setNewMessage('');
  };
  const handleNickName = (event) => {
    setNickName(event.target.value);
  }


  function dateFormat(date){
    var date1 = new Date(date);
    return date1.toLocaleString()
  }
  
  return (
    <div className="chat-room-container">
      <h3>Chat de torre de control 🏢</h3>
      <div className="messages-container">
        <ol className="messages-list">
          {messageObjects.map((messageObject, i) => (
            <li
              key={i}
              className={`message-item ${
                messageObject.name === nickName ? 'my-message' : 'received-message'
              }`}
            >
              <div className="chat-date">{dateFormat(messageObject.date)}</div>
              {messageObject.name} {': '}
              {messageObject.message}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Escribe un mensaje..."
        className="new-message-input-field"
      />
      <h4></h4>
      <textarea
        title="Nombre"
        value={nickName}
        onChange={handleNickName}
        placeholder="Elige un nombre"
        className="nickname"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Chat;