import { useParams } from "react-router-dom";
import { Title } from "../components/common/Title";
import Container from "../layouts/Container";
import { Section } from "../layouts/Section";
import { useQuery } from "@tanstack/react-query";
import { ProgramKey } from "../queries/keys";
import { ProgramType } from "../types/program";
import { StatusBadge } from "../components/common/StatusBadge";
import { List } from "../components/sign-up/List";
import { Label } from "../components/common/Label";
import { InputContainer } from "../components/sign-up/InputContainer";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { BUTTON_TYPE } from "../constants/keys";
import { IcoCheckOutlined, IcoSearch } from "../assets";

export default function ProgramApplyPage() {
  const { programId } = useParams();

  // TODO: api 연동 및 useQuery 변경
  const { data: program } = useQuery({
    queryKey: [ProgramKey.program, { id: programId }],
    queryFn: async (): Promise<ProgramType> => {
      // const data = await fetch("dummy-data/program-detail.json")
      //   .then((res) => res.json())
      //   .then((data) => data.program);

      return {
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
    },
  });

  if (!program) return <></>;

  return (
    <Container>
      <Title title="프로그램 신청" />

      <div className="my-5" />

      <section className="flex flex-col items-center justify-center w-full gap-3">
        <Section>
          <SubTitle title="프로그램 정보" />

          <section className="flex items-center h-full gap-6">
            <img
              src={"https://example.com/program-image.png"}
              alt="thumbnail"
              width={193}
              height={184}
              className="object-contain rounded-lg"
            />

            <div className="flex flex-col h-full gap-3">
              <StatusBadge status={program.status} />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg">{program.programName}</h3>
                <p className="text-sm text-gray-001">
                  {program.programStartDate.split("T")[0]} ~{" "}
                  {program.programEndDate.split("T")[0]}
                </p>
              </div>
            </div>
          </section>
        </Section>

        {/* TODO: 고도화 */}
        {/* <Section>
          <SubTitle title="강좌 선택" />
        </Section> */}

        <Section>
          <SubTitle title="신청자 정보" />

          <ul className="w-full flex flex-col gap-4 my-14 max-w-[46rem] items-center justify-center md:gap-7">
            <List>
              <Label label="이름" className="col-span-1" />

              <div className="w-full md:col-span-3">
                <Input
                  type="text"
                  placeholder="이름을 입력해주세요."
                  name={"userName"}
                  // onChange={handleChangeUser}
                  // helpText={emailErrorMsg}
                />
              </div>
            </List>

            <List>
              <Label label="핸드폰 번호" className="col-span-1" />

              <div className="w-full md:col-span-3">
                <Input
                  type="text"
                  placeholder="핸드폰번호를 입력해주세요."
                  name={"userPhoneNumber"}
                  // onChange={handleChangeUser}
                  // helpText={emailErrorMsg}
                />
              </div>
            </List>

            <List>
              <Label label="이메일" className="col-span-1" />

              <div className="w-full md:col-span-3">
                <Input
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  name={"userEmail"}
                  // onChange={handleChangeUser}
                  // helpText={emailErrorMsg}
                />
              </div>
            </List>

            <li className="flex flex-col items-start w-full gap-2 md:grid md:grid-cols-4">
              <Label label="주소" className="col-span-1" />
              <div className="flex flex-col w-full gap-3 md:col-span-2">
                <Input
                  type="text"
                  name="detailAddress"
                  disabled
                  // value={address.mainAddress}
                />

                <span className="w-full h-[46px] md:col-span-2">
                  <Input
                    type="text"
                    placeholder="상세주소를 입력해주세요."
                    name="detailAddress"
                    // value={address.detailAddress}
                    // onChange={(e) =>
                    //   setAddress((prev) => ({
                    //     ...prev,
                    //     detailAddress: e.target.value,
                    //   }))
                    // }
                  />
                </span>
              </div>

              <span className="w-full h-[46px] md:col-span-1 md:ml-3">
                <Button
                  type={BUTTON_TYPE.fill}
                  // onClick={() => setIsAddressOpen(true)}
                  onClick={() => {}}
                >
                  <span className="flex items-center justify-center gap-2">
                    <IcoSearch stroke="white" />
                    재검색
                  </span>
                </Button>
              </span>
            </li>
          </ul>
        </Section>

        <Section>
          <SubTitle title="추가 정보" />
        </Section>

        <Section>
          <section className="flex items-center justify-between mb-3">
            <SubTitle title="개인정보 수집 동의" />

            <button className="flex gap-[10px] items-center">
              <IcoCheckOutlined width={28} stroke="rgba(144, 144, 146, 1)" />
              <p className="text-gray-002">동의</p>
            </button>
          </section>

          <section className="px-8 py-6 rounded-lg bg-gray-005">
            <h3 className="text-sm font-semibold">개인정보수집 및 초상 이용</h3>

            <br />

            <ul className="text-sm font-light">
              <li>
                <p>1. 개인정보 수집 항목</p>
                <p>- 개인 식별 정보: 성명, 생년월일, 성별, 연락처</p>
                <p>- 프로그램 촬영 사진 및 영상 전체</p>
              </li>

              <br />

              <li>
                <p>2. 개인정보 수집 및 이용목적</p>
                <p>
                  강좌신청 예약 접수 및 행정 지출 증빙 및 사업 홍보 등을 위해
                  활용
                </p>
              </li>
            </ul>
          </section>
        </Section>
      </section>

      <div className="w-[12rem] my-8 h-12">
        <Button onClick={() => {}}>신청하기</Button>
      </div>
    </Container>
  );
}

function SubTitle({ title }: { title: string }) {
  return <h1 className="text-xl font-semibold">{title}</h1>;
}
