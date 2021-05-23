import '../index.css';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ImageOverlay} from 'react-leaflet';
import { LatLngBounds, Icon, L } from 'leaflet';

import {SocketContext} from '../socket';
import plane from '../plane.png';

function MyIcon() {


  const plane_url = "https://cdn-0.emojis.wiki/emoji-pics/facebook/airplane-facebook.png"
 
  return (
      <Icon url={plane_url}>
      </Icon>

  );
}
export default MyIcon;