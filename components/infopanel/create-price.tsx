import React, { useEffect, useState } from "react";
import {
  Price,
  Station,
  useCreatePriceMutation,
  usePetrolTypesQuery,
  useStationAvailablePetrolsQuery,
} from "../../src/gql/types";
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
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import selectedStation from "../../src/atoms/selected-station";
import { useSnackbar } from "notistack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IProps {
  onUpdate: () => Promise<void>;
  // stationId: string;
  station: Station;
}

interface IUpdateForm {
  price: string;
  fuelType: string;
}

const CreatePrice: React.FC<IProps> = ({ onUpdate, station }) => {
  const [create] = useCreatePriceMutation();
  const selected = useRecoilValue(selectedStation);
  const [open, setOpen] = useState(false);

  const { data, loading, error } = useStationAvailablePetrolsQuery({
    variables: { stationId: station?.id },
  });

  // const { data, loading, error } = usePetrolTypesQuery();

  const { register, handleSubmit, reset } = useForm<IUpdateForm>();

  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();

  const close = () => {
    setOpen(false);
  };

  const handleUpdate = async (data: IUpdateForm) => {
    if (!selected || !data.fuelType) return;

    const result = await create({
      variables: {
        stationId: selected.id ?? "",
        petrolTypeId: data.fuelType,
        price: parseFloat(data.price),
      },
    });

    if (result.data?.createPrice) {
      await onUpdate();
      close();
      enqueueSnackbar(t("prices:create:success"), {
        variant: "success",
      });
      return;
    }
    enqueueSnackbar(t("prices:create:error"), {
      variant: "error",
    });
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (open) {
      reset({
        price: (45).toFixed(2),
        fuelType: "",
      });
    }
  }, [open, reset]);

  if (loading) return <div>Loading</div>;

  if (error || !data || !data.station) return <div>Error</div>;

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t("prices:create:button")}</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box
          sx={{
            paddingY: 2,
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <DialogTitle>{t("prices:create:title")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("prices:create:description")}
            </DialogContentText>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <form onSubmit={handleSubmit(handleUpdate)}>
                <FormControl sx={{ m: 1, my: 2 }} fullWidth>
                  <InputLabel id="petrol-label">
                    {t("prices:create:type")}
                  </InputLabel>
                  <Select
                    labelId="petrol-label"
                    label={t("prices:create:type")}
                    {...register("fuelType")}
                  >
                    {data.station.company.availablePetrols?.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="body1">{type.name}</Typography>
                          <Typography variant="body2">
                            {t(`fuelSuperTypes:${type.superType.cat}`, {
                              type: type.superType.name,
                            })}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, my: 2 }} fullWidth variant="outlined">
                  <OutlinedInput
                    {...register("price")}
                    endAdornment={
                      <InputAdornment position="end">
                        {t("currencies:czk")}
                      </InputAdornment>
                    }
                    aria-describedby={t("prices:create:description")}
                    inputProps={{
                      "aria-label": t("prices:create:price"),
                      step: 0.1,
                      min: 0,
                      max: 80,
                      type: "number",
                    }}
                  />
                  {/* <FormHelperText></FormHelperText> */}
                </FormControl>
              </form>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("prices:create:cancel")}</Button>
            <Button variant="contained" onClick={handleSubmit(handleUpdate)}>
              {t("prices:create:submit")}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default CreatePrice;
