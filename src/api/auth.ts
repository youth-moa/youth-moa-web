import { api } from "./config";
import {
  AccountType,
  LoginResponse,
  CommonResponse,
  FindEmailRequest,
  FindEmailResponse,
  FindPasswordRequest,
  FindPasswordResponse,
  ChangePasswordRequest,
} from "../types/auth";

/** 회원가입 */
export function signUp(body: AccountType): Promise<CommonResponse> {
  return api.post("/api/users/join", body);
}

/** 로그인 */
export function login(body: {
  userEmail: string;
  userPassword: string;
}): Promise<LoginResponse> {
  return api.post("/api/users/login", body);
}

/** 이메일 중복 확인 */
export function checkEmail(userEmail: string): Promise<CommonResponse> {
  return api.get(`/api/users/check-email?userEmail=${userEmail}`);
}

/** 아이디 찾기 */
export function findEmail(body: FindEmailRequest): Promise<FindEmailResponse> {
  return api.post("/api/users/email/find", body);
}

/** 회원 정보 확인 (비밀번호 찾기) */
export function findPassword(
  body: FindPasswordRequest
): Promise<FindPasswordResponse> {
  return api.post("/api/users/password/find", body);
}

/** 비밀번호 갱신 */
export function changePassword({
  userId,
  body,
}: {
  userId: number;
  body: ChangePasswordRequest;
}): Promise<CommonResponse> {
  return api.patch(`/api/users/${userId}/password`, body);
}

/** 토큰 만료 여부 확인 */
export function checkExpirationToken() {
  return api.get("/api/users/token/check-expiration");
}

/** 회원 탈퇴 */
export function deleteUser(userEmail: string) {
  return api.delete(`/api/mypage/user/userEmail=${userEmail}`);
}
