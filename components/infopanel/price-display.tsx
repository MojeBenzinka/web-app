import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Price, Station, useCurrentPricesQuery } from "../../src/gql/types";
import UpdatePrice from "./update-price";
import EditIcon from "@mui/icons-material/Edit";
import CreatePrice from "./create-price";
import EvStationIcon from "@mui/icons-material/EvStation";
import PropaneIcon from "@mui/icons-material/Propane";
import classNames from "classnames";
import styles from "../../styles/petrol.module.scss";
import moment from "moment";
import ConfirmPrice from "./confirm-price";
import CheckIcon from "@mui/icons-material/Check";

const getIcon = (name: string, cat: string, name2: string) => {
  // try parse to int
  // const int = parseInt(name, 10);
  // if (!isNaN(int)) {
  //   return <Typography>{int}</Typography>;
  // }

  const r = () => {
    switch (cat) {
      case "electricity":
        return <EvStationIcon />;
      case "diesel":
        return <Typography sx={{ fontWeight: "bold" }}>D</Typography>;
      case "gas":
        return <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>;
      case "adblue":
        return <Typography sx={{ fontWeight: "bold" }}></Typography>;
      case "lpg":
      case "cng":
        return <PropaneIcon />;
      default:
        return <Typography>{name}</Typography>;
    }
  };

  const n = name2.toLocaleLowerCase();
  const isPlus = n.includes("plus") || n.includes("+");

  return (
    <Box sx={{ display: "flex", alignItems: "baseline" }}>
      {r()} {isPlus && <Typography sx={{ ml: "2px" }}>+</Typography>}
    </Box>
  );
};

interface IProps {
  stationId: string;
}

const PriceDisplay: React.FC<IProps> = ({ stationId }) => {
  const { data, loading, error, refetch } = useCurrentPricesQuery({
    variables: { stationId },
  });

  const [price, setPrice] = useState<Price | null>(null);
  const [confirmPrice, setConfirmPrice] = useState<Price | null>(null);

  const { t } = useTranslation();

  const handleClick = (price: Price) => {
    // if (!event.ctrlKey) return;

    setPrice(price);
  };

  const handleClickConfirm = (price: Price) => {
    // if (!event.ctrlKey) return;

    setConfirmPrice(price);
  };

  const onUpdate = async () => {
    await refetch({ stationId });
  };

  if (loading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (error) return <div>Error</div>;

  const prices = data?.station?.prices ?? [];

  return (
    <>
      <List dense>
        {prices.map((price) => (
          <ListItem
            key={price.id}
            className={classNames(
              styles.stripe,
              styles[price.type.superType.cat]
            )}
            secondaryAction={
              <Box>
                <Tooltip title={t("prices:confirm:title")}>
                  <IconButton
                    // edge="end"
                    aria-label="confirm current"
                    onClick={() => handleClickConfirm(price as Price)}
                  >
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("prices:update:title")}>
                  <IconButton
                    // edge="start"
                    aria-label="update"
                    onClick={() => handleClick(price as Price)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
          >
            <ListItemButton
            // onClick={handleClick(price as Price)}
            >
              <ListItemAvatar sx={{ width: "20px" }}>
                {/* <Avatar> */}
                {getIcon(
                  price.type.superType.name,
                  price.type.superType.cat,
                  price.type.name
                )}
                {/* </Avatar> */}
              </ListItemAvatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ fontWeight: "bold" }}>
                  {t(`currencies:${price.currency}`, {
                    price: price.price.toFixed(2),
                  })}
                </Box>
                <Box sx={{ fontSize: "14px" }}>{price.type.name}</Box>
                <Box sx={{ fontSize: "12px" }}>
                  {t("prices:updated", {
                    date: moment(new Date(price.updatedAt))
                      .locale("cs")
                      .format("DD.MM.YYYY"),
                  })}
                </Box>
              </Box>
              {/* <ListItemText
                primary={t(`currencies:${price.currency}`, {
                  price: price.price.toFixed(2),
                })}
                secondary={
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <span>{price.type.name}</span>
                    {t("prices:updated", {
                      date: moment(new Date(price.date)).fromNow(),
                    })}
                  </Box>
                }
              /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <CreatePrice station={data?.station as Station} onUpdate={onUpdate} />
      {/* {prices.length > 0 && (
        <Typography variant="caption">{t("prices:update:toEdit")}</Typography>
      )} */}
      <UpdatePrice
        open={!!price}
        onUpdate={onUpdate}
        price={price}
        close={() => setPrice(null)}
      />
      <ConfirmPrice
        onUpdate={onUpdate}
        close={() => setConfirmPrice(null)}
        open={!!confirmPrice}
        price={confirmPrice}
      />
    </>
  );
};

export default PriceDisplay;
