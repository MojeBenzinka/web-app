import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import styles from "../../styles/SearchPanel.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import {
  Collapse,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useMap } from "react-leaflet";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useShortcuts } from "react-shortcuts-hook";
import CompanyFilter from "../map/company-select";
import Box from "@mui/system/Box";

const ariaLabel = { "aria-label": "Search Field" };

export interface ISearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
}

interface ISearch {
  query: string;
}

const SearchPanel: React.FC = () => {
  const { register, handleSubmit, watch, reset, setFocus } = useForm<ISearch>();

  const [searchResults, setSearchResults] = useState<ISearchResult[] | null>(
    null
  );

  useShortcuts(["control", "q"], () => setFocus("query"), []);

  const [isLoading, setIsLoading] = useState(false);

  const map = useMap();

  const move = (lat: number, lon: number) => {
    map.panTo([lat, lon]);
  };

  const handleClear = () => {
    reset({ query: "" });
    setSearchResults(null);
  };

  useEffect(() => {
    if (searchResults) {
      setSearchResults(null);
    }
  }, [watch("query")]);

  const handleSearch = async (data: ISearch) => {
    const trimmed = data.query.toLowerCase().trim();
    if (trimmed.length === 0) return;
    setIsLoading(true);
    try {
      const query = encodeURIComponent(trimmed);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=cz,sk`
      );

      const result = (await res.json()) as ISearchResult[];
      setSearchResults(
        result
          .filter((r) => r.type === "administrative" || r.type === "village")
          .slice(0, 5)
      );
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Paper sx={{ padding: 1 }}>
        <Box display="flex" alignItems="center">
          <form onSubmit={handleSubmit(handleSearch)}>
            <FormControl fullWidth variant="standard">
              {/* <InputLabel htmlFor="standard-adornment-password">Search</InputLabel> */}
              <Input
                id="standard-adornment-password"
                type={"text"}
                autoComplete="off"
                fullWidth
                placeholder="Search (Ctrl + Q)"
                {...register("query")}
                endAdornment={
                  <IconButton
                    size="large"
                    onClick={
                      !!searchResults ? handleClear : handleSubmit(handleSearch)
                    }
                  >
                    {!searchResults && <SearchIcon />}
                    {!!searchResults && <CloseIcon />}
                  </IconButton>
                }
              />
            </FormControl>
          </form>
          <CompanyFilter />
        </Box>
        {isLoading && <LinearProgress variant="indeterminate" />}
        <Collapse
          unmountOnExit
          in={!!searchResults && searchResults.length > 0}
        >
          <List dense>
            {searchResults &&
              searchResults.map((result, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      move(parseFloat(result.lat), parseFloat(result.lon))
                    }
                  >
                    <ListItemText primary={result.display_name} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Collapse>
      </Paper>
    </div>
  );
};

export default SearchPanel;
