import {
  CenterListRequestBody,
  CenterListResponse,
  ProgramListRequestBody,
  RegionListResponse,
} from "../types/program";
import { encodeQueryData } from "../utils";
import { api } from "./config";

/** 프로그램 목록 조회 */
export function getProgramList(params?: {
  params: ProgramListRequestBody;
}): Promise<any> {
  const queryParams = params ? `?${encodeQueryData(params)}` : "";
  return api.get(`/api/programs/program-list${queryParams}`);
}

/** 지역 목록 조회 */
export function getRegionList(): Promise<RegionListResponse[]> {
  return api.get(`/api/programs/regions`);
}

/** 청년센터 목록 조회 */
export function getCenterList({
  regionId,
}: CenterListRequestBody): Promise<CenterListResponse[]> {
  return api.get(`/api/programs/centers?regionId=${regionId}`);
}
