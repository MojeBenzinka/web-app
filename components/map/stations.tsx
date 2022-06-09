import { Icon } from "leaflet";
import React, { useMemo } from "react";
import { Marker, useMap } from "react-leaflet";
import { useRecoilState } from "recoil";
import selectedStation from "../../src/atoms/selected-station";
import { Station, useStationsQuery } from "../../src/gql/types";

const Stations: React.FC = () => {
  const { data, loading } = useStationsQuery();

  if (loading || !data || !data.stations) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.stations.map((station) => (
        <StationMarker station={station as Station} key={station?.id} />
      ))}
    </>
  );
};

interface IStationMarker {
  station: Station;
}

const getSize = (zoomLevel: number): number => {
  const base = 35;

  return base;
  // TODO: FIX
  // bigger zoom level = smaller size
  //return base / Math.pow(2, zoomLevel);
};

const StationMarker: React.FC<IStationMarker> = ({ station }) => {
  const map = useMap();

  const [, setSelected] = useRecoilState(selectedStation);

  const select = (station: Station) => {
    setSelected(station);
    map.panTo([station.lat, station.lon]);
  };

  const s = useMemo(() => getSize(map.getZoom()), [map]);

  return (
    <Marker
      icon={
        new Icon({
          iconUrl: station?.company?.logo_img ?? "",
          iconSize: [s, s],
        })
      }
      key={station?.id}
      eventHandlers={{
        click: () => select(station),
      }}
      position={[station?.lat ?? 0, station?.lon ?? 0]}
    ></Marker>
  );
};

export default Stations;
