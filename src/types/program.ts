export interface ProgramListType {
  id: string | number;
  title: string;
  startAt: string;
  endAt: string;
  thumbnail: string;
  region: string;
  center: string;
}

export interface RegionListType {
  id: string | number;
  name: string;
  centers: string[];
}
