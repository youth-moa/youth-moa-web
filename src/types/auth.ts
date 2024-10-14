import { ProgramApplicationType } from "./program";

export interface AccountType {
  personalAgree: boolean;
  termsOfService: boolean;
  userMainAddress: string;
  userDetailAddress: string;
  userBirthday: string;
  userEmail: string;
  userGender: "M" | "F";
  userName: string;
  userPassword: string;
  userPasswordCheck: string;
  userPhoneNumber: string;
}

export interface LoginRequest {
  userEmail: string;
  userPassword: string;
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

export interface UserType {
  applicantName: string;
  applicantPhoneNumber: string;
  applicantEmail: string;
  applicantGender: "M" | "F";
  applicantBirthday: string;
  applicantMainAddress: string;
  applicantDetailAddress: string;
}

export interface UserResponse {
  userInfo: UserType;
  appliedPrograms: ProgramApplicationType[];
  programStatusCounts: {
    ongoingPrograms: number;
    completedPrograms: number;
  };
}
