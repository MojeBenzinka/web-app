import { atom } from "recoil";

const selectedCompanies = atom<string[]>({
  key: "selected-companies",
  default: [],
});

export default selectedCompanies;
