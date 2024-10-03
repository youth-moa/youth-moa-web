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
