import '../index.css';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from '../socket';
import Flight from './Flight.jsx';


const Dialog = ({}) => {

  const socket = useContext(SocketContext);

  const [flightsList, setFlightsList] = useState([]);

  const handleFlights = useCallback((flights) => {
    setFlightsList(flights);
  }, []);


  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:
    // subscribe to socket events
    socket.emit("FLIGHTS", {});
    //receive events
    socket.on('FLIGHTS', flights => handleFlights(flights));

    

    return () => {

    };
  }, [socket, handleFlights]);

  return (
    <div>
      <p>Vuelos</p>
      <div className={'row-container'}>
        {flightsList.map((flight) => (
          <Flight flight={flight}/>
        ))}
      </div>
    </div>
  );
};

export default Dialog;