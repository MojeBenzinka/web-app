import React, { useEffect } from "react";
import { Price, useUpdatePriceMutation } from "../../src/gql/types";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import selectedStation from "../../src/atoms/selected-station";
import { useSnackbar } from "notistack";

interface IProps {
  onUpdate: () => Promise<void>;
  close: () => void;
  price: Price | null;
  open: boolean;
}

interface IUpdateForm {
  price: string;
}

const UpdatePrice: React.FC<IProps> = ({ open, onUpdate, price, close }) => {
  const [update] = useUpdatePriceMutation();
  const selected = useRecoilValue(selectedStation);

  const { register, handleSubmit, reset } = useForm<IUpdateForm>();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const handleUpdate = async (data: IUpdateForm) => {
    if (!selected) return;

    const result = await update({
      variables: {
        stationId: selected.id ?? "",
        petrolTypeId: price?.type?.id ?? "",
        price: parseFloat(data.price),
      },
    });

    if (result.data?.updatePrice) {
      await onUpdate();
      close();
      enqueueSnackbar(t("prices:update:success"), {
        variant: "success",
      });
      return;
    }
    enqueueSnackbar(t("prices:update:error"), {
      variant: "error",
    });
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (open && price) {
      reset({
        price: price.price?.toFixed(2),
      });
    }
  }, [open, reset, price]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box
          sx={{
            paddingY: 2,
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <DialogTitle>{t("prices:update:title")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("prices:update:description", {
                title: price?.type.name,
              })}
            </DialogContentText>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <FormControl sx={{ m: 1, my: 2 }} fullWidth variant="outlined">
                <OutlinedInput
                  {...register("price")}
                  endAdornment={
                    <InputAdornment position="end">
                      {t("currencies:czk")}
                    </InputAdornment>
                  }
                  aria-describedby={t("prices:update:description", {
                    title: price?.type.name,
                  })}
                  inputProps={{
                    "aria-label": t("prices:update:price"),
                    step: 0.1,
                    min: 0,
                    max: 80,
                    type: "number",
                  }}
                />
                {/* <FormHelperText></FormHelperText> */}
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("prices:update:cancel")}</Button>
            <Button variant="contained" onClick={handleSubmit(handleUpdate)}>
              {t("prices:update:submit")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default UpdatePrice;
