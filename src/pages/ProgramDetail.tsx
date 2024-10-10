import { useNavigate, useParams } from "react-router-dom";
import Container from "../layouts/Container";
import { Section } from "../layouts/Section";
import { StatusBadge } from "../components/common/StatusBadge";
import { ReactNode } from "react";
import { Button } from "../components/common/Button";

const program = {
  id: 1,
  programName: "청년 리더십 프로그램",
  programShortDesc: "청년 리더십을 키우는 프로그램입니다.",
  applyStartDate: "2024-10-06T14:02:15.251Z",
  applyEndDate: "2024-10-06T14:02:15.251Z",
  programStartDate: "2024-10-06T14:02:15.251Z",
  programEndDate: "2024-10-06T14:02:15.251Z",
  capacity: 30,
  applicationCount: 15,
  contactInfo: "010-1234-5678",
  programImageUrl: "https://example.com/program-image.png",
  regionId: 1,
  regionName: "남양주시",
  centerId: 2,
  centerName: "청년공감터",
  status: "진행중",
};

export default function ProgramDetailPage() {
  const navigate = useNavigate();

  const { programId } = useParams();

  // TODO: 프로그램 상세조회

  return (
    <Container>
      <Section>
        <section className="flex flex-col items-center h-full gap-6 md:gap-20 md:flex-row">
          <img
            src={"https://example.com/program-image.png"}
            alt="thumbnail"
            width={269}
            className="object-contain h-[19rem] w-full md:h-full md:w-[17rem] rounded-lg"
          />

          <div className="flex-1 w-full">
            <section className="flex items-center justify-between w-full">
              <div className="flex flex-col w-full h-full gap-3">
                <StatusBadge status={program.status} />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg">{program.programName}</h3>
                  <p className="text-sm text-gray-001">
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
                <h4 className="w-1/4 min-w-16">신청 기간</h4>

                <p className="w-fit">
                  {program.applyStartDate.split("T")[0]} ~
                  {program.applyEndDate.split("T")[0]}
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 min-w-16">진행 기간</h4>

                <p className="w-fit">
                  {program.programStartDate.split("T")[0]} ~
                  {program.programEndDate.split("T")[0]}
                </p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 min-w-16">진행 장소</h4>
                <p className="w-fit"> {program.centerName}</p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 min-w-16">모집인원</h4>
                <p className="w-fit">{program.applicationCount}명</p>
              </ListItem>

              <ListItem>
                <h4 className="w-1/4 min-w-16">첨부파일</h4>
                <p className="w-fit"> //</p>
              </ListItem>
            </ul>

            <section className="flex items-center h-10 gap-3">
              {/* <button>즐겨찾기 아이콘</button> */}
              <Button onClick={() => navigate(`/program/apply/${programId}`)}>
                <div>신청하기</div>
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
