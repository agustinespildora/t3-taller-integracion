import socketIOClient from 'socket.io-client';
import React, {useState, useContext, useCallback, useEffect, useRef,} from 'react';
// const SOCKET_SERVER_URL = 'http://localhost:4000';
const SOCKET_SERVER_URL = 'wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl';
const NEW_CHAT_MESSAGE_EVENT = 'CHAT';

const ChatBack = () => {
  const [messageObjects, setMessageObjects] = useState([]); // Sent and received messages
  const socketRef = useRef();
  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      path: '/flights',
      transports: ['websocket'],
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (incomingMessageObject) => {
      // const incomingMessageObject = {
      //   ...messageObject,
      // };
      setMessageObjects((messageObjects) => [...messageObjects, incomingMessageObject]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room

  const sendMessageObject = (senderName, messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      name: senderName,
      message: messageBody,
    });
  };

  return { messageObjects, sendMessageObject };
};

export default ChatBack;