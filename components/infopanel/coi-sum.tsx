import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useStationCoiProblemsQuery } from "../../src/gql/types";
import moment from "moment";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface IProps {
  stationId: string;
}

const CoiSummary: React.FC<IProps> = ({ stationId }) => {
  const { data, loading, error } = useStationCoiProblemsQuery({
    variables: { stationId },
  });

  const { t } = useTranslation();

  if (loading) {
    return <LinearProgress variant="indeterminate" />;
  }

  if (error) return null;

  const problems = data?.station?.company?.coiProblems ?? [];

  if (!problems || problems.length === 0) return null;

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t("prices:coi:title")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography>{t("prices:coi:description")}</Typography>
            <List sx={{ width: "100%" }}>
              {problems.map((p, i) => {
                return (
                  <ListItem
                    key={p.nid}
                    secondaryAction={
                      <Tooltip title={t("prices:coi:readMore")}>
                        <IconButton edge="end" aria-label="see more">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    {/* <ListItemAvatar>
                      <ErrorIcon />
                    </ListItemAvatar> */}
                    <ListItemText
                      primary={t("prices:coi:fine", {
                        sum: t(`currencies:${p.field_currency}`, {
                          price: p.field_pokuta.toLocaleString(),
                        }),
                      })}
                      secondary={t("prices:coi:issued", {
                        date: moment(p.field_datum).format("DD.MM.YYYY"),
                      })}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CoiSummary;
