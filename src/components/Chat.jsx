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
  const SENDER_NAME = 'Agustín';

  const handleNewMessageChange = (event) => {
    // Checks wether the change was becouse of an Enter key press event,
    // so the newMessage Variable dos not update itsvalue
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessageObject(SENDER_NAME, newMessage);
    setNewMessage('');
  };


  function dateFormat(date){
    var date1 = new Date(date);
    return date1.toLocaleString()
  }
  return (
    <div className="chat-room-container">
      <h4 className="room-name">Chat de torre de control</h4>
      <div className="messages-container">
        <ol className="messages-list">
          {messageObjects.map((messageObject, i) => (
            <li
              key={i}
              className={`message-item ${
                messageObject.name === SENDER_NAME ? 'my-message' : 'received-message'
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
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Chat;