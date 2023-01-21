import { DataRequestName } from "./Auth/types";

export type DataRequest = {
  [P in DataRequestName]: string;
};
