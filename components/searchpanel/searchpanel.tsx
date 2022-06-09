import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import styles from "../../styles/SearchPanel.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import {
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMap } from "react-leaflet";
import CloseIcon from "@mui/icons-material/Close";

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

const SearchPanel: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const map = useMap();

  const move = (lat: number, lon: number) => {
    map.panTo([lat, lon]);
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchResults(null);
  };

  const handleSearch = async () => {
    const trimmed = searchValue.toLowerCase().trim();
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
        <FormControl fullWidth variant="standard">
          {/* <InputLabel htmlFor="standard-adornment-password">Search</InputLabel> */}
          <Input
            id="standard-adornment-password"
            type={"text"}
            value={searchValue}
            autoComplete="off"
            fullWidth
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            endAdornment={
              <IconButton
                size="large"
                onClick={!!searchResults ? handleClear : handleSearch}
              >
                {!searchResults && <SearchIcon />}
                {!!searchResults && <CloseIcon />}
              </IconButton>
            }
          />
        </FormControl>
        {isLoading && <CircularProgress />}
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
