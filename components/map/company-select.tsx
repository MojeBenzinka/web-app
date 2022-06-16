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
  Box,
} from "@mui/material";
import selectedCompanies from "../../src/atoms/selected-companies";
import { useRecoilState } from "recoil";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FixedSizeList } from "react-window";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { stringSimilarity } from "string-similarity-js";
import { useForm } from "react-hook-form";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

interface ISearch {
  search: string;
}

const CompanyFilter: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const [selectedComps, setSelectedComps] = useRecoilState(selectedCompanies);
  const [selectedLocal, setSelectedLocal] = useState(selectedComps);

  const { register, reset, watch } = useForm<ISearch>();

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

  const invert = () => {
    setSelectedLocal((prev) => {
      const newSelected = (data?.companies ?? [])
        .filter((c) => !prev.includes(c.id))
        .map((x) => x.id);
      return newSelected;
    });
  };

  const { search } = watch();

  const companies = useMemo<Company[]>(() => {
    if (!data || !data.companies) return [];

    const companies = data.companies as Company[];

    if (!search || search.length < 2) return companies;

    // similar strings
    const similar = companies.filter((c) => {
      const similarity = stringSimilarity(c.name, search, undefined, false);
      return similarity > 0.3;
    });

    return similar;
  }, [data, search]);

  if (loading) {
    return <CircularProgress size={30} />;
  }

  if (!data || !data.companies) return null;

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
          <Box sx={{ p: 2, pt: 0 }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="company-filter-search">
                {t("search:filterOptions:search")}
              </InputLabel>
              <Input
                id="company-filter-search"
                autoComplete="off"
                {...register("search")}
              />
              <FormHelperText>
                {t("search:filterOptions:searchDesc")}
              </FormHelperText>
            </FormControl>
          </Box>
          {/* <List sx={{ pt: 0 }}>
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
          </List> */}
          <FixedSizeList
            height={500}
            // innerElementType={innerElementType}
            itemCount={companies.length}
            itemSize={50}
            width="100%"
          >
            {({ style, index }) => {
              const company = companies[index];
              return (
                <ListItem key={company.id} disablePadding style={{ ...style }}>
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
              );
            }}
          </FixedSizeList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {t("search:filterOptions:cancel")}
          </Button>
          <Button onClick={invert}>{t("search:filterOptions:invert")}</Button>
          <Button onClick={save} variant="contained">
            {t("search:filterOptions:save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyFilter;
