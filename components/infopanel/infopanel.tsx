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
        <Box sx={{ padding: 2 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">{selected?.company?.name}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setSelected(null)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          {selected && <PriceChart stationId={selected.id} />}
          <Box sx={{ marginTop: 3 }}>
            Station ID:
            <br />
            <code>{selected?.id}</code>
            <IconButton onClick={makeCopy(selected?.id.trim())}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <Box sx={{ marginTop: 3 }}>
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
