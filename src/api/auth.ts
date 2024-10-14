import {
  AccountType,
  ChangePasswordRequest,
  CommonResponse,
  FindEmailRequest,
  FindEmailResponse,
  FindPasswordRequest,
  FindPasswordResponse,
  LoginRequest,
  LoginResponse,
  UserResponse,
} from "../types/auth";
import { api } from "./config";

/** 회원가입 */
export function signUp(body: AccountType): Promise<CommonResponse> {
  return api.post("/api/users/join", body);
}

/** 로그인 */
export function login(body: LoginRequest): Promise<LoginResponse> {
  return api.post("/api/users/login", body);
}

/** 로그아웃 */
export function logout(): Promise<CommonResponse> {
  return api.post(`/api/users/logout`);
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
export function checkExpirationToken(): Promise<any> {
  return api.get("/api/users/token/check-expiration");
}

/** 회원 탈퇴 */
export function deleteUser(userEmail: string): Promise<CommonResponse> {
  return api.delete(`/api/mypage/user?userEmail=${userEmail}`);
}

/** 사용자 정보 조회 */
export function getUserInfo(): Promise<UserResponse> {
  return api.get("/api/mypage/user/me/programs");
}

/** 토큰 재발급 */
export function getTokenByRefreshToken(refreshToken: string): Promise<any> {
  return api.post("/api/users/token/refresh", {
    headers: {
      RefreshToken: `Bearer ${refreshToken}`,
    },
  });
}

/** 비밀번호 재확인 */
export function recheckPassword(body: LoginRequest): Promise<CommonResponse> {
  return api.post("/api/mypage/recheck-pwd", body);
}

/** 개인정보 수정 */
export function editPersonalInfo(body: AccountType): Promise<CommonResponse> {
  return api.patch("/api/mypage/personal-info", body);
}
