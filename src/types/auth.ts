export interface AccountType {
  personalAgree: boolean;
  termsOfService: boolean;
  userAddress: string;
  userBirthday: string;
  userEmail: string;
  userGender: "M" | "F";
  userName: string;
  userPassword: string;
  userPasswordCheck: string;
  userPhoneNumber: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface CommonResponse {
  success: boolean;
  message: string;
}

export interface FindEmailRequest {
  userName: string;
  userPhoneNumber: string;
}

export interface FindEmailResponse {
  success: boolean;
  message: string;
  userEmail: string;
  createdAt: string;
}

export interface FindPasswordRequest {
  userEmail: string;
  userPhoneNumber: string;
}

export interface FindPasswordResponse {
  success: boolean;
  message: string;
  userId: number;
  userExists: boolean;
}

export interface ChangePasswordRequest {
  newPassword: string;
  newPasswordCheck: string;
}
