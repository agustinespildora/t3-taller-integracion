import '../index.css';
import React from 'react';

const Flight = ({ flight }) => {

  return (
    <div className={'flight-info vuelo'}>
      <p className={'bold'}>Vuelo: {flight.code}</p>
      <p>Origen: {flight.origin[0]}, {flight.origin[1]}</p>
      <p>Destino: {flight.destination[0]}, {flight.destination[1]}</p>
      <p>Aerolínea: {flight.airline}</p>
      <p>Avión: {flight.plane}</p>
      <p>Asientos: {flight.seats}</p>
      <p className={'bold'}>Pasajeros:</p>
      {flight.passengers.map((passenger) => (
          <div>
            <li>Nombre: {passenger.name}</li>
            <li>Edad: {passenger.age}</li>
          </div>

        ))}
    </div>
  );
};

export default Flight;