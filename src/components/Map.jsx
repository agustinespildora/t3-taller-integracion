import '../index.css';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { MapContainer, TileLayer, Polyline} from 'react-leaflet';
import {SocketContext} from '../socket';


function Map() {


  const limeOptions = { color: 'lime' }
  const redOptions = { color: 'red' }
  const blueOptions = { color: 'blue' }
  const orangeOptions = { color: 'orange' }
  const purpleOptions = { color: 'violet' }
  const blackOptions = { color: 'black' }
  const colorOptions = [limeOptions, redOptions, blueOptions, orangeOptions, purpleOptions]
  const socket = useContext(SocketContext);

  const [flightsList, setFlightsList] = useState([]);
  const [positionsList, setPositionsList] = useState([]);
  const [len, setLen] = useState(0);
  const [polylinesList, setPolylinesList] = useState([]);

  const handleFlights = useCallback((flights) => {
    flights.map((flight) => (
      setPolylinesList( (polylinesList) => [...polylinesList, [flight.origin, flight.destination]])
      
    ))
    setLen(flights.length);
    setFlightsList(flights);
  }, []);


  const handlePositions = useCallback((pos) => {
  setPositionsList( (positionsList) =>  [...positionsList, [[pos.position[0], pos.position[1]], [pos.position[0] + 0.00000001, pos.position[1] + 0.000000001]]]);
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

  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:
    // subscribe to socket events
    socket.emit("POSITION", {});
    //receive events
    socket.on('POSITION', pos => handlePositions(pos));
    
    return () => {
    };
  }, [socket, handlePositions]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossorigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossorigin=""
      ></script>
      <div className="Map">
      </div>
      <h3>Mapa en tiempo real 🗺️</h3>
      <div>
        <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {polylinesList.map((polyline, i) => (
            <Polyline pathOptions={colorOptions[i % 5]} positions={polyline} />
          ))}
          {positionsList.map((position, i) => (
            <Polyline pathOptions={blackOptions} positions={position} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
export default Map;