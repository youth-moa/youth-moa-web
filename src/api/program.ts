import {
  CenterListRequestBody,
  CenterListResponse,
  CommonResponse,
  ProgramApplicationFormType,
  ProgramDetailType,
  ProgramListRequestBody,
  ProgramListResponse,
  RegionListResponse,
} from "../types/program";
import { encodeQueryData } from "../utils";
import { api } from "./config";

/** 프로그램 목록 조회 */
export function getProgramList(params?: {
  params: ProgramListRequestBody;
}): Promise<ProgramListResponse> {
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

/** 프로그램 상세조회 */
export function getProgramById(programId: number): Promise<ProgramDetailType> {
  return api.get(`/api/programs?programId=${programId}`);
}

/** 프로그램 신청 */
export function postProgram(
  body: ProgramApplicationFormType
): Promise<CommonResponse> {
  return api.post("/api/applications", body);
}
