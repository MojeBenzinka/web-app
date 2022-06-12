import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Price, useCurrentPricesQuery } from "../../src/gql/types";
import useCtrlPress from "../../src/hooks/ctrlPress";
import UpdatePrice from "./update-price";

interface IProps {
  stationId: string;
}
const PriceDisplay: React.FC<IProps> = ({ stationId }) => {
  const { data, loading, error } = useCurrentPricesQuery({
    variables: { stationId },
  });

  const [price, setPrice] = useState<Price | null>(null);

  const { t } = useTranslation();

  const handleClick =
    (price: Price): React.MouseEventHandler<HTMLDivElement> =>
    (event) => {
      if (!event.ctrlKey) return;

      setPrice(price);
      // TODO: Handle edit modal
    };

  const onUpdate = () => {};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const prices = data?.station?.prices ?? [];

  return (
    <>
      <List dense>
        {prices.map((price) => (
          <ListItem key={price.id}>
            <ListItemButton onClick={handleClick(price)}>
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
      <Typography variant="caption">{t("prices:update:toEdit")}</Typography>
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
