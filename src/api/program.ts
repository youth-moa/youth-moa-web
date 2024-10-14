import {
  CenterListRequestBody,
  CenterListResponse,
  CommonResponse,
  ProgramApplicationDetailType,
  ProgramApplicationFormType,
  ProgramCancelRequestBody,
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
export function applylProgram({
  programId,
  body,
}: {
  programId: number;
  body: ProgramApplicationFormType;
}): Promise<CommonResponse> {
  return api.post(`/api/applications/${programId}`, body);
}

/** 프로그램 신청 취소 */
export function deleteProgram({
  programId,
  body,
}: {
  programId: number;
  body: ProgramCancelRequestBody;
}): Promise<CommonResponse> {
  return api.delete(`/api/mypage/programs/${programId}/cancel`, { data: body });
}

/** 프로그램 신청 정보 상세 조회 */
export function getProgramDetail(
  programId: number
): Promise<ProgramApplicationDetailType> {
  return api.get(`/api/mypage/programs/${programId}`);
}
