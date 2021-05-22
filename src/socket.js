import socketio from "socket.io-client";
import React from 'react';

export const socket = socketio.connect(
    'wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl', 
    {
      transports: ["websocket"],
      path: "/flights"
    }
  );
  
export const SocketContext = React.createContext();