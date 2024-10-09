export const BUTTON_TYPE = {
  fill: "fill",
  outlined: "outlined",
} as const;

export const PROGRAM_STATUS = {
  progress: "진행중",
  closed: "마감",
  pending: "대기",
  approved: "승인",
  rejected: "반려",
  canceled: "취소",
} as const;

export const PROGRAM_SORT = {
  TOTAL: "",
  LATEST: "latest",
  POPULAR: "popular",
  PROGRESS: "progress",
};
