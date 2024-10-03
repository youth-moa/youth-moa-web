import { api } from "./config";
import { AccountType } from "../types/auth";

/** 회원가입 */
export function signUp(body: AccountType) {
  return api.post("/api/users/join", body);
}

/** 로그인 */
export function login(body: { userEmail: string; userPassword: string }) {
  return api.post("/api/users/login", body);
}

/** 이메일 중복 확인 */
export function checkEmail(userEmail: string) {
  return api.get(`/api/users/check-email?userEmail=${userEmail}`);
}

/** 아이디 찾기 */
export function findEmail(body: {
  userEmail: string;
  userPhoneNumber: string;
}) {
  return api.post("/api/users/email/find", body);
}

/** 회원 정보 확인 (비밀번호 찾기) */
export function findPassword(body: {
  userEmail: string;
  userPhoneNumber: string;
}) {
  return api.post("/api/users/password/find", body);
}

/** 비밀번호 갱신 */
export function changePassword({
  userId,
  body,
}: {
  userId: string;
  body: { newPassword: string; newPasswordCheck: string };
}) {
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
