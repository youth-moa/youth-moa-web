export interface ProgramListType {
  id: number;
  programImageUrl: string;
  programName: string;
  status: "IN_PROGRESS" | "PENDING";
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

export interface ProgramType {
  id: number;
  programName: string;
  programShortDesc: string;
  applyStartDate: string;
  applyEndDate: string;
  programStartDate: string;
  programEndDate: string;
  capacity: number;
  applicationCount: number;
  contactInfo: string;
  programImageUrl: string;
  regionId: number;
  regionName: string;
  centerId: number;
  centerName: string;
  status: string;
}

export interface ProgramListRequestBody {
  regionId?: number;
  centerId?: number;
  sort?: string;
  page?: number;
  size?: number;
}
