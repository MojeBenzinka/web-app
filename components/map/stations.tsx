import { IconButton, Paper, Tooltip, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import Box from "@mui/system/Box";
import { DivIcon, Icon } from "leaflet";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Marker, useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import selectedCompanies from "../../src/atoms/selected-companies";
import selectedStation from "../../src/atoms/selected-station";
import { Station, useStationsQuery } from "../../src/gql/types";
import RefreshIcon from "@mui/icons-material/Refresh";
import classNames from "classnames";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Link from "next/link";

const canShowS = (zLevel: number) => zLevel >= 12;

interface IProps {
  stations?: Station[];
}

const Stations: React.FC<IProps> = ({ stations: ds = [] }) => {
  const companyIds = useRecoilValue(selectedCompanies);
  const [, setSelectedStation] = useRecoilState(selectedStation);
  const [toOpenId, setToOpenId] = useState<string | null>(null);

  // const [zoomLevel, setZoomLevel] = useState<number>(1);

  const map = useMap();
  const bounds = map.getBounds();
  const [center, setCenter] = useState(map.getCenter());
  // const center = map.getCenter();

  const { t } = useTranslation();

  const [canShowStations, setCanShowStations] = useState(true);

  // let timer: NodeJS.Timeout = setTimeout(() => {}, 1500);

  const { data, loading, previousData, refetch } = useStationsQuery({
    variables: {
      companyIds,
      // lat: map?.getCenter()?.lat,
      // lon: map?.getCenter()?.lng,
      // zoom: map?.getZoom(),
    },
  });

  // const zoomLevel = useMemo<number>(() => {
  //   return z;
  // }, [z]);

  const visibleMarkers = useMemo<Station[]>(() => {
    if (!ds && (!data || !data.stations)) return [];

    const stations = (data?.stations as Station[]) ?? ds;

    const stats = stations.filter((s) => {
      const { lat, lon } = s;

      return bounds.contains([lat, lon]);
    });

    return stats;
  }, [data, bounds, center, ds]);

  // const onMove = (event: LeafletEvent) => {
  //   if (timer) {
  //     clearTimeout(timer);
  //     // console.log("waiting for user to stop pls");
  //   }
  //   timer = setTimeout(() => {
  //     onChange(event, map.getZoom());
  //   }, 1000);
  // };

  // const onChange = (event: LeafletEvent, z: number) => {
  //   // const z = map.getZoom();
  //   //if (!canShow) return;
  //   const bounds = map.getBounds();
  //   const north = bounds.getNorth();
  //   const south = bounds.getSouth();
  //   const east = bounds.getEast();
  //   const west = bounds.getWest();
  //   if (canShowS(z)) refetch({ north, west, south, east, companyIds });
  // };

  const moved = () => {
    const z = map.getZoom();

    if (z >= 12) {
      const c = map.getCenter();
      setCenter(c);
    }
  };

  const updateZoom = () => {
    const z = map.getZoom();
    if (z >= 12) {
      const c = map.getCenter();
      setCenter(c);
    }

    if (!isNaN(z)) {
      setCanShowStations(canShowS(z));
    }
  };

  const checkStations = () => {
    const stationId = new URLSearchParams(window.location.search).get(
      "station"
    );
    if (stationId) {
      setToOpenId(stationId);
    }
  };

  useEffect(() => {
    if (data && !loading && !previousData && toOpenId) {
      const station = data.stations?.find((s) => s.id === toOpenId);
      if (station) {
        setSelectedStation(station as Station);
      }
    }
  }, [data, loading, previousData, toOpenId]);

  useEffect(() => {
    checkStations();
    setTimeout(() => {
      map.addEventListener("moveend", moved);
      map.addEventListener("zoomend", updateZoom);
    }, 1500);

    return () => {
      map.removeEventListener("moveend", moved);
      map.removeEventListener("zoomend", updateZoom);
    };
  }, []);

  // const markers = useMemo<Station[]>(() => {
  //   if (!data || !data.stations) return [];
  //   // console.log("Showing", data.stations.length, "stations");
  //   return data.stations as Station[];
  // }, [data]);

  if (!ds && loading && !previousData) {
    return <CircularProgress />;
  }

  return (
    <>
      <Fade in={!canShowStations} unmountOnExit>
        <Box
          className="zoom-in-alert"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper sx={{ padding: 4, opacity: 0.85, textAlign: "center" }}>
            <Typography variant="h6">{t("map:zoomToSee")}</Typography>
            <Typography variant="body2">
              {t("map:zoomToSeeDescription")}
            </Typography>
          </Paper>
        </Box>
      </Fade>
      <div className="refresh-btn">
        <IconButton
          onClick={() => refetch()}
          color="primary"
          disabled={loading}
        >
          <RefreshIcon />
        </IconButton>
        <Link href="https://helpdesk.kdenatankuju.cz/" passHref>
          <a rel="noreferrer" target="_blank">
            <Tooltip title="Feedback">
              <IconButton color="primary">
                <FeedbackIcon />
              </IconButton>
            </Tooltip>
          </a>
        </Link>
      </div>
      {canShowStations &&
        visibleMarkers.map((station) => (
          <StationMarker station={station as Station} key={station?.id} />
        ))}
      {/* {loading &&
        previousData &&
        canShowStations &&
        previousData.stations?.map((station) => (
          <StationMarker station={station as Station} key={station?.id} />
        ))}
      {canShowStations &&
        markers.map((station) => (
          <StationMarker station={station as Station} key={station?.id} />
        ))} */}
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
    // map.setView([station.lat, station.lon], 14, { animate: true });
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
        // new Icon({
        //   iconUrl: uri,
        //   //html: `<div className="mrkr"></div>`,
        //   iconSize: [s, s],
        //   className: selected?.id == station?.id ? "selected" : "",
        // })

        new DivIcon({
          // iconUrl: uri,
          html: `<div class="${classNames("station-marker", {
            selected: selected?.id == station?.id,
          })}">
            <img src="${uri}"></img>
          </div>`,
          iconSize: [s, s],
          className: "",
          // className: selected?.id == station?.id ? "selected" : "",
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
