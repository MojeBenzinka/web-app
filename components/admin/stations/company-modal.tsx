import React from "react";
import {
  PetrolType,
  Station,
  useAddFuelToCompanyMutation,
  usePetrolTypesQuery,
  useStationAvailablePetrolsQuery,
  useRemoveFuelFromCompanyMutation,
} from "../../../src/gql/types";
import { FixedSizeList } from "react-window";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import { useSnackbar } from "notistack";

interface IProps {
  station: Station;
}

const CompanyPetrolModal: React.FC<IProps> = ({ station }) => {
  const {
    data: petrolData,
    error: petrolError,
    loading: l1,
    previousData: pd1,
  } = usePetrolTypesQuery();
  const {
    data: available,
    loading: l2,
    refetch,
    previousData: pd2,
  } = useStationAvailablePetrolsQuery({
    variables: { stationId: station.id },
  });
  const [create] = useAddFuelToCompanyMutation();
  const [del] = useRemoveFuelFromCompanyMutation();

  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = (petrolId: string) => async () => {
    try {
      await create({
        variables: { companyId: station?.company?.id, petrolTypeId: petrolId },
      });
      await refetch();
      enqueueSnackbar("Fuel type added", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Err", { variant: "error" });
    }
  };

  const handleRemove = (petrolId: string) => async () => {
    try {
      await del({
        variables: { companyId: station?.company?.id, petrolTypeId: petrolId },
      });

      await refetch();
      enqueueSnackbar("Fuel type added", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Err", { variant: "error" });
    }
  };

  if (l1 || (l2 && !pd1 && !pd2)) {
    return <div>Loading...</div>;
  }

  if (!petrolData || !petrolData.petrolTypes) return null;
  if (!available || !available.station || !available.station.company)
    return null;

  const petrols = petrolData.petrolTypes as PetrolType[];
  const availablePetrols =
    (available.station.company.availablePetrols as PetrolType[]) ?? [];

  return (
    <div>
      <Typography variant="h6">{station.company.name}</Typography>
      <Grid container>
        <Grid item xs>
          <FixedSizeList
            itemCount={petrolData.petrolTypes.length ?? 0}
            itemSize={50}
            height={500}
            width={"100%"}
          >
            {({ style, index }) => {
              const pType = petrols[index];
              return (
                <ListItem key={pType.id} disablePadding style={{ ...style }}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleAdd(pType.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={availablePetrols.some(
                          (p) => p.id === pType.id
                        )}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText id={pType.id} primary={pType.name} />
                    {/* <ListItemAvatar sx={{ ml: 5 }}>
                      <Avatar src={`/stations/${pType.logo_img}`} />
                    </ListItemAvatar> */}
                  </ListItemButton>
                </ListItem>
              );
            }}
          </FixedSizeList>
        </Grid>
        <Grid item xs>
          <FixedSizeList
            itemCount={availablePetrols.length ?? 0}
            itemSize={50}
            height={500}
            width={"100%"}
          >
            {({ style, index }) => {
              const pType = availablePetrols[index];
              return (
                <ListItem key={pType.id} disablePadding style={{ ...style }}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleRemove(pType.id)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={availablePetrols.some(
                          (p) => p.id === pType.id
                        )}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText id={pType.id} primary={pType.name} />
                    {/* <ListItemAvatar sx={{ ml: 5 }}>
                      <Avatar src={`/stations/${pType.logo_img}`} />
                    </ListItemAvatar> */}
                  </ListItemButton>
                </ListItem>
              );
            }}
          </FixedSizeList>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyPetrolModal;
