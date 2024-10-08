import { SpaceListType } from "../types/common";
import { api } from "./config";

export function getSpageList(): Promise<SpaceListType[]> {
  return api.get("/api/spaces");
}
