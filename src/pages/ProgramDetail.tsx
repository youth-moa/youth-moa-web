import { useNavigate, useParams } from "react-router-dom";
import Container from "../layouts/Container";
import { Section } from "../layouts/Section";
import { StatusBadge } from "../components/common/StatusBadge";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "../components/common/Button";
import { useQuery } from "@tanstack/react-query";
import { ProgramKey } from "../queries/keys";
import { getProgramById } from "../api/program";
import { dateFormat } from "../utils";
import { IcoCheckOutlined } from "../assets";

export default function ProgramDetailPage() {
  const navigate = useNavigate();

  const { programId } = useParams();

  const [currentProgramId, setCurrentProgramId] = useState(programId);

  const { data: program, refetch } = useQuery({
    queryKey: [ProgramKey.program, { id: programId }], // query key
    // queryFn: () => getProgramById(Number(programId)), // API 호출 함수
    queryFn: () => getProgramById(Number(1)), // API 호출 함수
    // {
    //   enabled: !!programId,
    // }
  });

  useEffect(() => {
    if (programId !== currentProgramId) {
      setCurrentProgramId(programId);
      refetch();
    }
  }, [programId, refetch]);

  if (!program) return;

  // TODO: api 수정 후 반영
  return (
    <Container hasBgColor>
      <Section>
        <section className="flex flex-col items-center h-full gap-6 md:gap-20 md:flex-row">
          <img
            src={program.programResponseDTO.programImageUrl}
            alt="thumbnail"
            width={269}
            className="object-contain h-[19rem] w-full md:h-full md:w-[17rem] rounded-lg"
          />

          <div className="flex-1 w-full overflow-hidden">
            <section className="flex items-center justify-between w-full">
              <div className="flex flex-col w-full h-full gap-3">
                <StatusBadge status={program.programResponseDTO.status} />

                <div className="flex flex-col gap-1">
                  <h3 className="overflow-hidden text-lg font-medium text-ellipsis whitespace-nowrap">
                    {program.programResponseDTO.programName}
                  </h3>

                  <p className="overflow-hidden text-sm text-gray-001 text-ellipsis whitespace-nowrap">
                    {program.programShortDesc}
                  </p>
                </div>
              </div>

              {/* TODO: 고도화 */}
              {/* <button>
                <IcoShare width={48} />
              </button> */}
            </section>

            <div className="py-3" />

            <ul className="flex flex-col gap-4 mb-11">
              <ListItem>
                <h4 className="w-1/4 font-medium text-black min-w-16">
                  신청 기간
                </h4>

                <p className="overflow-hidden text-base font-normal w-fit text-gray-000 whitespace-nowrap text-ellipsis">
                  {program.applyStartDate.split("T")[0]} ~
                  {program.applyEndDate.split("T")[0]}
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 font-medium text-black min-w-16">
                  진행 기간
                </h4>

                <p className="overflow-hidden text-base font-normal w-fit text-gray-000 whitespace-nowrap text-ellipsis">
                  {dateFormat(program.programResponseDTO.programStartDate)} ~
                  {dateFormat(program.programResponseDTO.programEndDate)}
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 font-medium text-black min-w-16">
                  진행 장소
                </h4>
                <p className="text-base font-normal w-fit text-gray-000">
                  {" "}
                  {program.centerName}
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 font-medium text-black min-w-16">
                  모집인원
                </h4>
                <p className="text-base font-normal w-fit text-gray-000">
                  {program.capacity}명
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 font-medium text-black min-w-16">
                  첨부파일
                </h4>
                <p className="text-base font-normal w-fit text-gray-000"> //</p>
              </ListItem>
            </ul>

            <section className="flex items-center h-10 gap-3">
              {/* <button>즐겨찾기 아이콘</button> */}
              <Button onClick={() => navigate(`/program/apply/${programId}`)}>
                <span className="flex items-center gap-2">
                  <IcoCheckOutlined stroke="white" width={16} />
                  신청하기
                </span>
              </Button>
            </section>
          </div>
        </section>
      </Section>

      <div className="my-3" />

      <Section>상세</Section>
    </Container>
  );
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className="flex items-center justify-start w-full">{children}</li>;
}
