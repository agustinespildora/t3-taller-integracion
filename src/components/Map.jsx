import '../index.css';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ImageOverlay} from 'react-leaflet';
import { LatLngBounds, Icon, L } from 'leaflet';
import {SocketContext} from '../socket';
import plane from '../plane.png';
import MyIcon from './MyIcon.jsx';

function Map() {
  // const polyline = [
  //   [-34.82264, -58.533321],
  //   [-33.382761, -70.803203],
  // ]

  const plane_url = "https://cdn-0.emojis.wiki/emoji-pics/facebook/airplane-facebook.png"
  // var myicon = new L.icon({iconUrl: plane, iconAnchor: new L.Point(16, 16)});
  const bounds = new LatLngBounds([-34.82264, -58.533321], [-33.382761, -70.803203])
  // let bound = ([
  //   [
  //     center[1] - height / 2,
  //     center[0] - width / 2
  //   ],
  //   [
  //     center[1] + height / 2,
  //     center[0] + width / 2
  //   ]
  // ]);
  const limeOptions = { color: 'lime' }
  const redOptions = { color: 'red' }
  const blueOptions = { color: 'blue' }
  const orangeOptions = { color: 'orange' }
  const purpleOptions = { color: 'violet' }
  const colorOptions = [limeOptions, redOptions, blueOptions, orangeOptions, purpleOptions]
  const socket = useContext(SocketContext);

  const [flightsList, setFlightsList] = useState([]);
  // const [positionsDict, setPositionsDict] = useState({});
  const [len, setLen] = useState(0);
  const [polylinesList, setPolylinesList] = useState([]);
  const [polylinesColors, setPolylinesColors] = useState([]);

  const handleFlights = useCallback((flights) => {
    flights.map((flight) => (
      setPolylinesList( (polylinesList) => [...polylinesList, [flight.origin, flight.destination]])
      
    ))
    setLen(flights.length);
    setFlightsList(flights);
  }, []);

  // const handlePositions = useCallback((pos) => {
  //   // console.log(pos)
  //   // for (let index = 0; index < len; index++) {
  //   //   const flight = flightsList[index];
  //   //   if (flight.code === pos.code){
        
  //   //   }
  //   // }
  //   console.log(positionsDict);
  //   if (positionsDict[pos.code]) {
  //     setPositionsDict( (positionsDict) =>  positionsDict[pos.code].push([pos.position[0], pos.position[1]]));
  //   }
  //   else {
  //     setPositionsDict( (positionsDict) =>  positionsDict[pos.code] = [[pos.position[0], pos.position[1]]]);
  //   }
  // }, []);

  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:
    // subscribe to socket events
    socket.emit("FLIGHTS", {});
    //receive events
    socket.on('FLIGHTS', flights => handleFlights(flights));
    
    return () => {
    };
  }, [socket, handleFlights]);

  // useEffect(() => {
  //   // as soon as the component is mounted, do the following tasks:
  //   // subscribe to socket events
  //   socket.emit("POSITION", {});
  //   //receive events
  //   socket.on('POSITION', pos => handlePositions(pos));
    
  //   return () => {
  //   };
  // }, [socket, handlePositions]);

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
          {/* <ImageOverlay
            url={plane_url}
            bounds={bounds}
            zIndex={10}
          /> */}
          {polylinesList.map((polyline, i) => (
            <Polyline pathOptions={colorOptions[i % 5]} positions={polyline} />
          ))}
          <Marker position={[0, 0]} >
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