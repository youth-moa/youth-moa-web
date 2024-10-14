import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProgramById } from "../api/program";
import { IcoCheckOutlined } from "../assets";
import { Button } from "../components/common/Button";
import { StatusBadge } from "../components/common/StatusBadge";
import Container from "../layouts/Container";
import { Section } from "../layouts/Section";
import { ProgramKey } from "../queries/keys";
import { dateFormat } from "../utils";

export default function ProgramDetailPage() {
  const navigate = useNavigate();

  const { programId } = useParams();

  const [currentProgramId, setCurrentProgramId] = useState(programId);

  const { data: program, refetch } = useQuery({
    queryKey: [ProgramKey.program, { id: programId }],
    queryFn: () => getProgramById(Number(programId)),
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
        <div className="flex flex-col items-center h-full gap-6 md:gap-20 md:flex-row">
          <img
            src={program.programResponseDTO?.programImageUrl}
            alt="thumbnail"
            className="object-contain h-[19rem] w-full md:h-full md:w-[17rem] rounded-lg"
          />

          <div className="flex-1 w-full overflow-hidden">
            <section className="flex items-center justify-between w-full">
              <div className="flex flex-col w-full h-full gap-3">
                <StatusBadge status={program.programResponseDTO?.status} />

                <div className="flex flex-col gap-1">
                  <h3 className="overflow-hidden text-lg font-medium text-ellipsis whitespace-nowrap">
                    {program.programResponseDTO?.programName}
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
                  {dateFormat(program.applyStartDate)} ~
                  {dateFormat(program.applyEndDate)}
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 font-medium text-black min-w-16">
                  진행 기간
                </h4>

                <p className="overflow-hidden text-base font-normal w-fit text-gray-000 whitespace-nowrap text-ellipsis">
                  {dateFormat(program.programResponseDTO?.programStartDate)} ~
                  {dateFormat(program.programResponseDTO?.programEndDate)}
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 font-medium text-black min-w-16">
                  진행 장소
                </h4>
                <p className="text-base font-normal w-fit text-gray-000">
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

              {program.attachmentUrl && (
                <ListItem>
                  <h4 className="w-1/4 font-medium text-black min-w-16">
                    첨부파일
                  </h4>

                  <div className="flex flex-col">
                    {program.attachmentUrl?.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        className="text-base font-normal cursor-pointer w-fit text-gray-000"
                        download
                      >
                        {url}
                      </a>
                    ))}
                  </div>
                </ListItem>
              )}
            </ul>

            <section className="flex items-center h-10 gap-3">
              {/* <button>즐겨찾기 아이콘</button> */}
              <Button
                onClick={() => navigate(`/program/apply/${programId}`)}
                disabled={program.programResponseDTO?.status === "closed"}
              >
                <span className="flex items-center gap-2">
                  <IcoCheckOutlined stroke="white" width={16} />
                  신청하기
                </span>
              </Button>
            </section>
          </div>
        </div>
      </Section>

      <div className="my-3" />

      <Section>
        <div className="flex flex-col gap-5">
          {program.programDetailImageUrl && (
            <img src={program.programDetailImageUrl} className="w-full" />
          )}

          {program.programDetail}
        </div>
      </Section>
    </Container>
  );
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className="flex items-start justify-start w-full">{children}</li>;
}
