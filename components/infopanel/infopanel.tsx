import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import selectedStation from "../../src/atoms/selected-station";
import CloseIcon from "@mui/icons-material/Close";
import PriceChart from "./price-chart";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useClipboard } from "use-clipboard-copy";
import { useSnackbar } from "notistack";
import PriceDisplay from "./price-display";
import { Divider } from "@mui/material";

const InfoPanel: React.FC = () => {
  const [selected, setSelected] = useRecoilState(selectedStation);
  const { copy } = useClipboard();

  const { enqueueSnackbar } = useSnackbar();

  const makeCopy = (text?: string) => () => {
    if (!text) return;
    copy(text);
    enqueueSnackbar("Copied to clipboard", {
      variant: "success",
    });
  };

  const handleChangeSelected = () => {
    if (selected) {
      const id = selected.id;
      // add to query params
      const url = new URL(window.location.href);
      url.searchParams.set("station", id);
      window.history.pushState({}, "", url.toString());
    } else {
      // remove from query params
      const url = new URL(window.location.href);
      url.searchParams.delete("station");
      window.history.pushState({}, "", url.toString());
    }
  };

  useEffect(() => {
    handleChangeSelected();
  }, [selected]);

  return (
    <div>
      <Drawer
        sx={{
          width: 500,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 500,
          },
        }}
        variant="persistent"
        anchor="right"
        open={!!selected}
      >
        <Box sx={{ paddingX: 2 }}>
          <Grid
            container
            sx={{ paddingY: 2 }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <img
                src={`/stations/${selected?.company?.logo_img}`}
                height={120}
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                component="h2"
                sx={{ whiteSpace: "normal" }}
              >
                {selected?.company?.name}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setSelected(null)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
          <Box sx={{ marginBottom: 2 }}>
            {selected && <PriceDisplay stationId={selected.id} />}
          </Box>
          <Divider sx={{ marginBottom: 2 }} />
          {selected && <PriceChart stationId={selected.id} />}
          <Divider sx={{ marginTop: 2 }} />
          <Box sx={{ marginTop: 3, fontSize: 12 }}>
            Station ID:
            <br />
            <code>{selected?.id}</code>
            <IconButton onClick={makeCopy(selected?.id.trim())}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box sx={{ marginTop: 3, fontSize: 12 }}>
            Company ID:
            <br />
            <code>{selected?.company?.id}</code>
            <IconButton onClick={makeCopy(selected?.company?.id.trim())}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default InfoPanel;
