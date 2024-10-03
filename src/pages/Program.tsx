import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Container from "../layouts/Container";

import { Title } from "../components/common/Title";
import { ProgramCard } from "../components/common/ProgramCard";

import type { ProgramListType, RegionListType } from "../types/program";
import {
  IcoCheckFilled,
  IcoCheckOutlined,
  IcoFilter,
  IcoNext,
} from "../assets";
import { ProgramKey } from "../queries/keys";
import { api } from "../api/config";

const SORT_LIST = ["전체", "진행중", "최신순", "인기순"];

export default function ProgramPage() {
  // TODO: api 연동 및 useQuery 변경
  const { data: regions } = useQuery({
    queryKey: [ProgramKey.region],
    queryFn: async (): Promise<RegionListType[]> => {
      const data = await fetch("dummy-data/region.json")
        .then((res) => res.json())
        .then((data) => data.regions);

      return data;
    },
  });

  useEffect(() => {
    api.get("/");
  }, []);

  // TODO: api 연동 및 useQuery 변경
  const { data: programs } = useQuery({
    queryKey: [ProgramKey.program],
    queryFn: async (): Promise<ProgramListType[]> => {
      const data = await fetch("dummy-data/program.json")
        .then((res) => res.json())
        .then((data) => data.programs);

      return data;
    },
  });

  const [selectedRegions, setSelectedRegions] = useState<(number | string)[]>(
    []
  );
  const [selectedCenters, setSelectedCenters] = useState<string[]>([]);
  const [sorted, setSorted] = useState("전체");

  const centers =
    selectedRegions.length > 0
      ? regions
          ?.filter((region) => selectedRegions.includes(region.id))
          .map((item) => item.centers)
          .flat()
      : regions?.map((region) => region.centers).flat();
  const programNum = programs?.length ?? 0;

  const handleClick = (filter: string) => {
    setSorted(filter);
  };

  const handleSelectRegion = (regionId: number | string) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions((prev) => prev.filter((id) => id !== regionId));
      return;
    }

    setSelectedRegions((prev) => [...prev, regionId]);
  };

  const handleSelectCenter = (center: string) => {
    if (selectedCenters.includes(center)) {
      setSelectedCenters((prev) => prev.filter((c) => c !== center));
      return;
    }

    setSelectedCenters((prev) => [...prev, center]);
  };

  return (
    <Container>
      <Title title="프로그램" />

      <div className="my-5" />

      <section className="flex w-full max-w-[57.5rem] gap-10 px-5">
        <div className="hidden min-w-64 md:inline-block" />

        <div className="flex flex-col items-start justify-between w-full gap-3 md:items-center md:flex-row">
          <span>
            전체 <strong className="text-blue">{programNum}</strong> 건
          </span>

          <div className="flex items-center justify-between w-full md:w-fit">
            <div className="flex items-center gap-2">
              {SORT_LIST.map((item, index) => (
                <Badge
                  key={index}
                  name={item}
                  isSelected={item === sorted}
                  onClick={() => handleClick(item)}
                />
              ))}
            </div>

            <button className="inline-block md:hidden">
              <IcoFilter />
            </button>
          </div>
        </div>
      </section>

      <div className="my-1" />

      <section className="flex justify-between max-w-[57.5rem] w-full gap-10 px-5">
        <section className="flex-col hidden gap-3 md:flex min-w-64">
          <div className="flex items-center justify-between px-5 py-3 text-white rounded-lg bg-blue">
            <p className="text-xl font-semibold">필터</p>
            <button className="text-sm">초기화</button>
          </div>

          <div>
            <button className="flex items-center justify-between w-full px-5 py-3 text-black border-2 rounded-lg border-gray-004">
              <p className="text-xl font-semibold">지역</p>
              <button>아이콘</button>
            </button>

            <div className="px-5 py-3 rounded-b-lg bg-gray-005">
              {regions?.map((region) => (
                <Item
                  key={region.id}
                  name={region.name}
                  count={region.centers.length}
                  isChecked={selectedRegions.includes(region.id)}
                  onClick={() => handleSelectRegion(region.id)}
                />
              ))}

              <div className="my-3" />

              <div className="flex justify-end">
                <button className="flex items-center gap-2 text-sm text-gray-000">
                  지역 더보기
                  <IcoNext fill="rgba(111, 111, 111, 1)" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <button className="flex items-center justify-between w-full px-5 py-3 text-black border-2 rounded-lg border-gray-004">
              <p className="text-xl font-semibold">청년센터</p>
            </button>

            <div className="px-5 py-3 rounded-b-lg bg-gray-005">
              {centers?.map((center, index) => (
                <Item
                  key={index}
                  name={center}
                  isChecked={selectedCenters.includes(center)}
                  onClick={() => handleSelectCenter(center)}
                />
              ))}

              <div className="my-3" />

              <div className="flex justify-end">
                <button className="flex items-center gap-2 text-sm text-gray-000">
                  청년센터 더보기
                  <IcoNext fill="rgba(111, 111, 111, 1)" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <div className="my-3" />

          <div className="flex flex-wrap items-center gap-5">
            {programs?.map((program) => (
              <ProgramCard
                key={program.id}
                {...program}
                status="진행중"
                isLiked={true}
                onClick={() => {}}
              />
            ))}
          </div>
        </section>
      </section>
    </Container>
  );
}

interface PropsType {
  name: string;
  isSelected?: boolean;
  onClick: () => void;
}

function Badge(props: PropsType) {
  const { name, isSelected = false, onClick } = props;

  return (
    <button
      className={`rounded-2xl text-xs px-2.5 py-1 border ${
        isSelected
          ? "bg-blue text-white border-blue"
          : "bg-gray-005 text-gray-002 border-gray-003"
      }`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

interface ItemPropsType {
  name: string;
  count?: number;
  isChecked?: boolean;
  onClick: () => void;
}

function Item(props: ItemPropsType) {
  const { name, count, isChecked = false, onClick } = props;
  return (
    <button
      className="flex items-center justify-start w-full gap-3 text-sm"
      onClick={onClick}
    >
      <span className={isChecked ? "text-blue" : ""}>
        {isChecked ? (
          <IcoCheckFilled
            fill="rgba(63, 48, 233, 1)"
            stroke="rgba(63, 48, 233, 1)"
            width={14}
          />
        ) : (
          <IcoCheckOutlined stroke="rgba(111, 111, 111, 1)" width={14} />
        )}
      </span>
      <p>{name}</p>
      <span className="font-semibold text-blue">{count}</span>
    </button>
  );
}
