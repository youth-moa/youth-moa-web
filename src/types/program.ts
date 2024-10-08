export interface ProgramListType {
  id: number;
  programImageUrl: string;
  programName: string;
  status: "IN_PROGRESS" | "PENDING";
  programStartDate: string;
  programEndDate: string;
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

export interface RegionListResponse {
  id: number;
  regionName: string;
  centerCount: number;
}

export interface CenterListRequestBody {
  regionId: number[];
}

export interface CenterListResponse {
  id: number;
  centerName: string;
  regionId: number;
  regionName: string;
}
