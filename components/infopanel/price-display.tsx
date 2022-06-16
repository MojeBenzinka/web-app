import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Price, Station, useCurrentPricesQuery } from "../../src/gql/types";
import useCtrlPress from "../../src/hooks/ctrlPress";
import UpdatePrice from "./update-price";
import EditIcon from "@mui/icons-material/Edit";
import CreatePrice from "./create-price";

interface IProps {
  stationId: string;
}
const PriceDisplay: React.FC<IProps> = ({ stationId }) => {
  const { data, loading, error, refetch } = useCurrentPricesQuery({
    variables: { stationId },
  });

  const [price, setPrice] = useState<Price | null>(null);

  const { t } = useTranslation();

  const handleClick = (price: Price) => {
    // if (!event.ctrlKey) return;

    setPrice(price);
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
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleClick(price as Price)}
              >
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemButton
            // onClick={handleClick(price as Price)}
            >
              <ListItemText
                secondary={price.type?.name}
                primary={t(`currencies:${price.currency}`, {
                  price: price.price.toFixed(2),
                })}
              />
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
    </>
  );
};

export default PriceDisplay;
