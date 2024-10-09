export interface CommonResponse {
  success: boolean;
  message: string;
}

export interface ProgramListType {
  programId: number;
  programImageUrl: string;
  programName: string;
  status: "progress" | "closed";
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
  regionId?: number[];
  centerId?: number[];
  sort?: string;
  page?: number;
  size?: number;
}

export interface ProgramListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: {
    programId: number;
    programImageUrl: string;
    programName: string;
    status: "progress" | "closed";
    programStartDate: string;
    programEndDate: string;
  }[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
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

export interface ProgramDetailType {
  id: number;
  programResponseDTO: {
    programId: number;
    programImageUrl: string;
    programName: string;
    status: "progress" | "closed";
    programStartDate: string;
    programEndDate: string;
  };
  programShortDesc: string;
  applyStartDate: string;
  applyEndDate: string;
  capacity: number;
  applicationCount: number;
  contactInfo: string;
  programImageUrl: string;
  programDetailImageUrl: string | null;
  programDetail: string | null;
  regionId: number;
  regionName: string;
  centerId: number;
  centerName: string;
  attachmentUrl: string[];
}

export interface ProgramApplicationFormType {
  programId: number;
  selectedCourse: string;
  subjectiveAnswer: string;
  objectiveAnswer: string;
  fileUrl: string;
  personalInfoAgree: boolean;
}

export interface ProgramApplicationType {
  programId: number;
  programName: string;
  applicationDate: string;
  status: "pending" | "approved" | "rejected" | "canceled";
  programStartDate: string;
  programEndDate: string;
  programImageUrl: string;
}
