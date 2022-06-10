import CircularProgress from "@mui/material/CircularProgress";
import { DivIcon, Icon, LeafletEvent } from "leaflet";
import React, { useEffect, useMemo } from "react";
import { Marker, useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import selectedCompanies from "../../src/atoms/selected-companies";
import selectedStation from "../../src/atoms/selected-station";
import { Station, useStationsQuery } from "../../src/gql/types";

const Stations: React.FC = () => {
  const companyIds = useRecoilValue(selectedCompanies);
  const map = useMap();

  const { data, loading, refetch, previousData } = useStationsQuery({
    variables: {
      companyIds,
      // lat: map?.getCenter()?.lat,
      // lon: map?.getCenter()?.lng,
      // zoom: map?.getZoom(),
    },
  });

  const onChange = (event: LeafletEvent) => {
    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();
    refetch({ north, west, south, east, companyIds });
  };

  useEffect(() => {
    map.addEventListener("moveend", onChange);

    return () => {
      map.removeEventListener("moveend", onChange);
    };
  }, []);

  const markers = useMemo<Station[]>(() => {
    if (!data || !data.stations) return [];
    return data.stations as Station[];
  }, [data]);

  if (loading && previousData) {
    return (
      <>
        {previousData.stations?.map((station) => (
          <StationMarker station={station as Station} key={station?.id} />
        ))}
      </>
    );
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {markers.map((station) => (
        <StationMarker station={station as Station} key={station?.id} />
      ))}
    </>
  );
};

interface IStationMarker {
  station: Station;
}

const getSize = (zoomLevel: number, selected: boolean): number => {
  const base = selected ? 45 : 40;

  return base;
  // TODO: FIX
  // bigger zoom level = smaller size
  //return base / Math.pow(2, zoomLevel);
};

const StationMarker: React.FC<IStationMarker> = ({ station }) => {
  const map = useMap();

  const [selected, setSelected] = useRecoilState(selectedStation);

  const select = (station: Station) => {
    setSelected(station);
    map.panTo([station.lat, station.lon], { animate: true });
  };

  const isSelected = useMemo(() => station.id === selected?.id, [selected]);

  const s = useMemo(
    () => getSize(map.getZoom(), isSelected),
    [map, isSelected]
  );

  const url = station?.company?.logo_img;
  const uri = url?.startsWith("http") ? url : `/stations/${url}`;

  return (
    <Marker
      icon={
        new Icon({
          iconUrl: uri,
          //html: `<div className="mrkr"></div>`,
          iconSize: [s, s],
          className: selected?.id == station?.id ? "selected" : "",
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
