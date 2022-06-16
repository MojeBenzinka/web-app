import React, { useEffect, useState } from "react";
import { CircleMarker, Marker, Popup, useMap } from "react-leaflet";
import useGeolocation from "react-hook-geolocation";
import Fab from "@mui/material/Fab";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import styles from "../../styles/MapControls.module.scss";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { isPointInPolygon } from "geolib";
import { DivIcon } from "leaflet";

const gpsTimeout = 300;

const LocationLayer: React.FC = () => {
  const { latitude, longitude, accuracy, error, heading } = useGeolocation({
    enableHighAccuracy: true,
  });

  const [canMove, setCanMove] = useState(true);

  let timer: NodeJS.Timeout = setTimeout(() => {}, gpsTimeout);

  const map = useMap();

  const onMove = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      handleMoveCoords();
    }, gpsTimeout);
  };

  const handleMoveCoords = () => {
    // lat, lon
    const center = map.getCenter();
    const zoom = map.getZoom();
    const lat = center.lat;
    const lon = center.lng;

    // add to query params
    const url = new URL(window.location.href);
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lon.toString());
    url.searchParams.set("zoom", zoom.toString());
    window.history.replaceState({}, "", url.toString());
    // window.history.pushState({}, "", `?lat=${lat}&lon=${lon}&zoom=${zoom}`);
  };

  const handleInitialParams = () => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get("lat");
    const lon = params.get("lon");
    const zoom = params.get("zoom");
    if (lat && lon && zoom) {
      const parseLat = parseFloat(lat);
      const parseLon = parseFloat(lon);
      const parseZoom = parseInt(zoom);
      if (!isNaN(parseLat) && !isNaN(parseLon) && !isNaN(parseZoom)) {
        map.setView([parseLat, parseLon], parseZoom);
        setCanMove(false);
      }
    }
  };

  const czechRepublicPolygon = [
    { latitude: 51.03395176501104, longitude: 11.78869826893885 },
    { latitude: 48.490458301949154, longitude: 12.017550002607448 },
    { latitude: 48.60112138856494, longitude: 18.774986713965326 },
    { latitude: 50.97901824709889, longitude: 19.06525467181402 },
  ];

  const moveMap = () => {
    if (latitude && longitude) {
      if (isPointInPolygon({ latitude, longitude }, czechRepublicPolygon)) {
        map.setView([latitude, longitude], 13);
        setCanMove(false);
      }
    }
  };

  useEffect(() => {
    if (canMove) moveMap();
  }, [latitude, longitude, canMove]);

  useEffect(() => {
    map.addEventListener("move", onMove);
    handleInitialParams();

    return () => {
      map.removeEventListener("move", onMove);
    };
  }, []);

  const move = () => {
    // map.panTo([latitude, longitude]);
    // map.setZoom(14);
    map.setView([latitude, longitude], 14, { animate: true });
  };

  if (error || !latitude || !longitude)
    return (
      <Box
        className={styles.locationButton}
        display="flex"
        flexDirection="column"
        alignItems={"center"}
      >
        <Box className="zoom-control" sx={{ mb: 2 }}>
          <ButtonGroup orientation="vertical" aria-label="" variant="contained">
            <Button onClick={() => map.zoomIn()}>
              <ZoomInIcon />
            </Button>
            <Button onClick={() => map.zoomOut()}>
              <ZoomOutIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    );

  return (
    <>
      <Box
        className={styles.locationButton}
        display="flex"
        flexDirection="column"
        alignItems={"center"}
      >
        <Box className="zoom-control" sx={{ mb: 2 }}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
          >
            <Button onClick={() => map.zoomIn()}>
              <ZoomInIcon />
            </Button>
            <Button onClick={() => map.zoomOut()}>
              <ZoomOutIcon />
            </Button>
          </ButtonGroup>
        </Box>

        <Fab color="primary" aria-label="my-location" onClick={move}>
          <MyLocationIcon />
        </Fab>
      </Box>
      <Marker
        position={[latitude, longitude]}
        icon={
          new DivIcon({
            html: `<div class="user-location"></div>`,
            className: "",
          })
        }
      />
      {/* <CircleMarker
        center={[latitude, longitude]}
        className="transition"
        radius={2}
        fillColor="#ff0000"
        color="#ff0000"
      >
        <Popup>
          <span>{`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}</span>
          <br />
          <span>heading: {heading}</span>
          <br />
          <span>accuracy: {accuracy}</span>
        </Popup>
      </CircleMarker> */}
    </>
  );
};

export default LocationLayer;
