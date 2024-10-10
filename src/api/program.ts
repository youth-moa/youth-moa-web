import { ProgramListRequestBody } from "../types/program";
import { encodeQueryData } from "../utils";
import { api } from "./config";

/** 프로그램 목록 조회 */
export function getProgramList(params?: {
  params: ProgramListRequestBody;
}): Promise<any> {
  const queryParams = params ? `?${encodeQueryData(params)}` : "";
  return api.get(`/api/programs/program-list${queryParams}`);
}
