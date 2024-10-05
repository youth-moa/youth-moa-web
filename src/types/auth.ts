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

export interface SignUpResponse {
  success: boolean;
  message: string;
}

export interface CheckEmailResponse {
  success: boolean;
  message: string;
}
