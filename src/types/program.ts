export interface ProgramListType {
  id: number;
  programImageUrl: string;
  programName: string;
  status: "진행중" | "마감";
  programStartDate: string;
  programEndDate: string;
}

export interface RegionListType {
  id: number;
  regionName: string;
  count: number;
}

export interface ProgramFilterModalType {
  isOpen: boolean;
  title: string;
  list: any[];
  selected: any[];
  onSelected: (data?: number[]) => void;
}
