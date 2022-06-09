import { atom } from "recoil";
import { Station } from "../gql/types";

const selectedStation = atom<Station | null>({
  key: "selected-station",
  default: null,
});

export default selectedStation;
