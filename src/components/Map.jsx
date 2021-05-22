import '../index.css';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import {SocketContext} from '../socket';

function Map() {
  const polyline = [
    [-34.82264, -58.533321],
    [-33.382761, -70.803203],
  ]
  const limeOptions = { color: 'lime' }
  const socket = useContext(SocketContext);

  const [flightsList, setFlightsList] = useState([]);
  const [polylinesList, setPolylinesList] = useState([]);

  const handleFlights = useCallback((flights) => {
    flights.map((flight) => (
      setPolylinesList( (polylinesList) => [...polylinesList, [flight.origin, flight.destination]])
    ))
    setFlightsList(flights);
    // dibujar_trayectorias();
  }, []);

  // function dibujar_trayectorias(){
  //   flightsList.map((flight) => (
  //     setPolylinesList( (polylinesList) => [...polylinesList, [flight.origin, flight.destination]])
  //   ))
  // }


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
        Mapa en tiempo real
      </div>
      <div>
        <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline pathOptions={limeOptions} positions={polylinesList} />
          <Marker position={[0, 0]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
export default Map;