import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Container from "../layouts/Container";

import { Title } from "../components/common/Title";
import { ProgramCard } from "../components/common/ProgramCard";
import { FilterModal } from "../components/program/FilterModal";
import { Button } from "../components/common/Button";

import type { ProgramFilterModalType } from "../types/program";
import {
  IcoArrowUp,
  IcoCheckFilled,
  IcoCheckOutlined,
  IcoFilter,
  IcoNext,
  IcoRefresh,
} from "../assets";
import { CommonKey, ProgramKey } from "../queries/keys";
import { getCenterList, getProgramList, getRegionList } from "../api/program";
import { PROGRAM_SORT } from "../constants/keys";

const SORT_LIST = [
  { key: PROGRAM_SORT.TOTAL, name: "전체" },
  { key: PROGRAM_SORT.PROGRESS, name: "진행중" },
  { key: PROGRAM_SORT.LATEST, name: "최신순" },
  { key: PROGRAM_SORT.POPULAR, name: "인기순" },
];
const MAX_NUM = 15;

export default function ProgramPage() {
  const navigate = useNavigate();

  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [selectedCenters, setSelectedCenters] = useState<number[]>([]);
  const [sorted, setSorted] = useState(PROGRAM_SORT.TOTAL);
  // TODO: 페이지네이션 추가
  const [page, setPage] = useState({
    current: 0,
    total: 0,
  });
  const [totalCounts, setTotalCounts] = useState(0);
  // const [isShow, setIsShow] = useState({
  //   region: true,
  //   center: true,
  // });
  const [filterModal, setFilterModal] = useState<ProgramFilterModalType>({
    isOpen: false,
    title: "",
    list: [],
    selected: [],
    onSelected: () => {},
  });

  const { data: regions } = useQuery({
    queryKey: [CommonKey.list, { type: ProgramKey.region }],
    queryFn: async () => {
      const data = getRegionList();

      return data;
    },
    initialData: [],
  });

  const { data: centers, refetch: centersRefetch } = useQuery({
    queryKey: [CommonKey.list, { type: ProgramKey.center }],
    queryFn: async () => {
      const data = await getCenterList({ regionId: selectedRegions });

      return data;
    },
    initialData: [],
  });

  const { data: programs, refetch: programsRefetch } = useQuery({
    queryKey: [
      CommonKey.list,
      { type: ProgramKey.program, page: page.current },
    ],
    queryFn: async () => {
      const params = {
        regionId: selectedRegions,
        centerId: selectedCenters,
        sort: sorted,
        page: page.current + 1,
      };

      const data = await getProgramList({ params });

      setTotalCounts(data.totalElements);
      setPage((prev) => ({ ...prev, total: data.totalPages }));

      return data.content;
    },
    initialData: [],
  });

  useEffect(() => {
    centersRefetch();
  }, [selectedRegions.length]);

  useEffect(() => {
    programsRefetch();
  }, [selectedRegions.length, selectedCenters.length, sorted, page.current]);

  const handleClick = (sort: string) => {
    setSorted(sort);
  };

  const handleSelectRegion = (regionId: number) => {
    if (selectedRegions.includes(regionId)) {
      setSelectedRegions((prev) => prev.filter((id) => id !== regionId));
      return;
    }

    setSelectedRegions((prev) => [...prev, regionId]);
    setSelectedCenters([]);
  };

  const handleSelectCenter = (id: number) => {
    if (selectedCenters.includes(id)) {
      setSelectedCenters((prev) => prev.filter((c) => c !== id));
      return;
    }

    setSelectedCenters((prev) => [...prev, id]);
  };

  const handleApplyProgram = (programId: number) => {
    navigate(`/program/apply/${programId}`);
  };

  const handleCloseModal = () => {
    setFilterModal({
      isOpen: false,
      title: "",
      list: [],
      selected: [],
      onSelected: () => {},
    });
  };

  const handleClickReset = () => {
    setSelectedCenters([]);
    setSelectedRegions([]);
  };

  return (
    <>
      <Container>
        <Title title="프로그램" />

        <div className="my-5" />

        <section className="flex w-full max-w-[60rem] gap-10 px-5">
          <div className="hidden min-w-64 md:inline-block" />

          <div className="flex flex-col items-start justify-between w-full gap-3 md:items-center md:flex-row">
            <span>
              전체 <strong className="text-blue">{totalCounts}</strong> 건
            </span>

            <div className="flex items-center justify-between w-full md:w-fit">
              <div className="flex items-center gap-2">
                {SORT_LIST.map((item, index) => (
                  <Badge
                    key={index}
                    name={item.name}
                    isSelected={item.key === sorted}
                    onClick={() => handleClick(item.key)}
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

        <section className="flex justify-between max-w-[60rem] w-full gap-10 px-5">
          <section className="flex-col hidden gap-3 md:flex min-w-64">
            <div className="flex items-center justify-between px-5 py-3 text-white rounded-lg bg-blue">
              <p className="text-xl font-semibold">필터</p>
              <button
                className="flex items-center gap-1"
                onClick={handleClickReset}
              >
                <IcoRefresh fill="white" />
                <span className="text-sm">초기화</span>
              </button>
            </div>

            <div>
              <button
                className="flex items-center justify-between w-full px-5 py-3 text-black border-2 rounded-lg border-gray-004"
                // onClick={() =>
                //   setIsShow((prev) => ({ ...prev, region: !prev.region }))
                // }
              >
                <p className="text-xl font-semibold">지역</p>
                <IcoArrowUp />
              </button>

              <div className="flex flex-col gap-1 px-5 py-3 rounded-b-lg bg-gray-005">
                {regions?.slice(0, MAX_NUM).map((region) => (
                  <Item
                    key={region.id}
                    name={region.regionName}
                    count={region.centerCount}
                    isChecked={selectedRegions.includes(region.id)}
                    onClick={() => handleSelectRegion(region.id)}
                  />
                ))}

                {regions && regions.length > MAX_NUM && (
                  <>
                    <div className="my-2" />

                    <div className="flex justify-end">
                      <button
                        className="flex items-center gap-2 text-sm text-gray-000"
                        onClick={() =>
                          setFilterModal({
                            isOpen: true,
                            title: "지역",
                            list: regions.map((region) => ({
                              id: region.id,
                              name: region.regionName,
                              count: region.centerCount,
                            })),
                            selected: selectedRegions,
                            onSelected: (data?: number[]) => {
                              data && setSelectedRegions(data);
                            },
                          })
                        }
                      >
                        지역 더보기
                        <IcoNext fill="rgba(111, 111, 111, 1)" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <button
                className="flex items-center justify-between w-full px-5 py-3 text-black border-2 rounded-lg border-gray-004"
                // onClick={() =>
                //   setIsShow((prev) => ({ ...prev, center: !prev.center }))
                // }
              >
                <p className="text-xl font-semibold">청년센터</p>
                <IcoArrowUp />
              </button>

              <div className="flex flex-col gap-1 px-5 py-3 rounded-b-lg bg-gray-005">
                {centers?.slice(0, MAX_NUM).map((center) => (
                  <Item
                    key={center.id}
                    name={center.centerName}
                    isChecked={selectedCenters.includes(center.id)}
                    onClick={() => handleSelectCenter(center.id)}
                  />
                ))}

                {centers && centers.length > MAX_NUM && (
                  <>
                    <div className="my-2" />

                    <div className="flex justify-end">
                      <button
                        className="flex items-center gap-2 text-sm text-gray-000"
                        onClick={() =>
                          setFilterModal({
                            isOpen: true,
                            title: "청년센터",
                            list: centers.map((center) => ({
                              id: center.id,
                              name: center.centerName,
                            })),
                            selected: selectedCenters,
                            onSelected: (data?: number[]) => {
                              data && setSelectedCenters(data);
                            },
                          })
                        }
                      >
                        청년센터 더보기
                        <IcoNext fill="rgba(111, 111, 111, 1)" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="my-3" />

            <div className="flex flex-wrap items-center gap-5">
              {programs?.map((program) => (
                <div className="flex flex-col gap-2">
                  <ProgramCard
                    key={program.programId}
                    {...program}
                    onClick={() =>
                      navigate(`/program/detail/${program.programId}`)
                    }
                  />

                  <div className="h-10">
                    <Button
                      onClick={() => handleApplyProgram(program.programId)}
                      disabled={program.status === "closed"}
                    >
                      <span className="flex items-center gap-2">
                        <IcoCheckOutlined stroke="white" width={16} />
                        신청하기
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </Container>

      {filterModal.isOpen && (
        <FilterModal
          title={filterModal.title}
          list={filterModal.list}
          seleted={filterModal.selected}
          onClose={handleCloseModal}
          onSelected={filterModal.onSelected}
        />
      )}
    </>
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
