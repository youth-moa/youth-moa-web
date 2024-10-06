export interface ProgramListType {
  id: number;
  programImageUrl: string;
  programName: string;
  status: "진행중" | "마감";
  programStartDate: string;
  programEndDate: string;
}

export interface RegionListType {
  id: string | number;
  name: string;
  centers: string[];
}
