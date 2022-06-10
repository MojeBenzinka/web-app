import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Stations from "./stations";
import LocationLayer from "./location";
import SearchPanel from "../searchpanel/searchpanel";
import styles from "../../styles/MapControls.module.scss";
import useLagRadar from "./uselagradar";

const czechRepublicCenter: [number, number] = [50.08, 14.43];

const Map: React.FC = () => {
  useLagRadar();

  return (
    <MapContainer
      center={czechRepublicCenter}
      zoom={13}
      scrollWheelZoom={true}
      className={styles.mapContainer}
      zoomControl={false}
      doubleClickZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchPanel />
      <Stations />

      <LocationLayer />
    </MapContainer>
  );
};

export default Map;
