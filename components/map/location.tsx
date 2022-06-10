import React from "react";
import { CircleMarker, Popup, useMap } from "react-leaflet";
import useGeolocation from "react-hook-geolocation";
import Fab from "@mui/material/Fab";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import styles from "../../styles/MapControls.module.scss";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const LocationLayer: React.FC = () => {
  const { latitude, longitude, timestamp, accuracy, error, heading } =
    useGeolocation({ enableHighAccuracy: true });

  const map = useMap();

  const move = () => {
    map.panTo([latitude, longitude]);
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
      <CircleMarker
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
      </CircleMarker>
    </>
  );
};

export default LocationLayer;
