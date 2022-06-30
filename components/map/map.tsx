import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Stations from "./stations";
import LocationLayer from "./location";
import SearchPanel from "../searchpanel/searchpanel";
import styles from "../../styles/MapControls.module.scss";
import useLagRadar from "./uselagradar";
import { Station } from "../../src/gql/types";

const czechRepublicCenter: [number, number] = [50.08, 14.43];

interface IProps {
  stations?: Station[];
}

const Map: React.FC<IProps> = ({ stations: defaultStations = [] }) => {
  // useLagRadar();

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
      <Stations stations={defaultStations} />

      <LocationLayer />
    </MapContainer>
  );
};

export default Map;
