import * as React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import { Company, useCompanyNamesQuery } from "../../src/gql/types";
import {
  ListItemButton,
  ListItemIcon,
  Checkbox,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import selectedCompanies from "../../src/atoms/selected-companies";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const CompanyFilter: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const [selectedComps, setSelectedComps] = useRecoilState(selectedCompanies);
  const [selectedLocal, setSelectedLocal] = useState(selectedComps);

  const { data, loading } = useCompanyNamesQuery();

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedLocal(selectedComps);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (id: string) => () => {
    setSelectedLocal((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const save = () => {
    setSelectedComps(selectedLocal);
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress size={30} />;
  }

  if (!data || !data.companies) return null;

  const { companies } = data;

  return (
    <div>
      <Tooltip title={t("search:filter")}>
        <IconButton aria-label={t("search:filter")} onClick={handleClickOpen}>
          <FilterAltIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
        <DialogTitle>{t("search:filterOptions:companies")}</DialogTitle>
        <DialogContent>
          <List sx={{ pt: 0 }}>
            {(companies as Company[]).map((company) => (
              <ListItem key={company.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleSelect(company.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedLocal.indexOf(company.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={company.id} primary={company.name} />
                  <ListItemAvatar sx={{ ml: 5 }}>
                    <Avatar src={`/stations/${company.logo_img}`} />
                  </ListItemAvatar>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("search:filterOptions:cancel")}
          </Button>
          <Button onClick={save} variant="contained">
            {t("search:filterOptions:save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyFilter;
