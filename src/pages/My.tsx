import { Title } from "../components/common/Title";
import Container from "../layouts/Container";
import { IcoPageFlip, IcoSetting } from "../assets";
import { Section } from "../components/my/Section";
import { SubTitle } from "../components/my/SubTitle";
import { ProgramApplication } from "../components/my/ProgramApplication";
import { useLocation, useNavigate } from "react-router-dom";
import { ProgramApplicationDetail } from "../components/my/ProgramApplicationDetail";

export default function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get("type");
  const id = new URLSearchParams(location.search).get("id");

  const user = {
    userName: "청년모아",
  };

  return (
    <Container hasBgColor>
      <Title title="마이페이지" />

      <section className="w-full flex flex-col md:flex-row gap-5 max-w-[60rem] my-14">
        <div className="flex flex-col gap-5 flex-[0.4]">
          <Section>
            <SubTitle text={`반가워요! ${user.userName}님 😊`} />

            <div className="my-5" />

            <section className="flex items-center gap-4 p-5 rounded-lg bg-gray-005">
              <div className="flex flex-col items-center w-full">
                <h3 className="text-sm font-medium text-gray-000">
                  진행중인 프로그램
                </h3>
                <p className="mt-2 text-2xl font-semibold text-black">0</p>
              </div>

              <div className="border h-14 border-gray-006" />

              <div className="flex flex-col items-center w-full">
                <h3 className="text-sm font-medium text-gray-000">
                  종료된 프로그램
                </h3>
                <p className="mt-2 text-2xl font-semibold text-black">0</p>
              </div>
            </section>
          </Section>

          <Section>
            <ul className="flex flex-col gap-5">
              <li>
                <button
                  className="flex items-center gap-3 text-base font-medium text-gray-000"
                  onClick={() => navigate("/my?type=program")}
                >
                  <IcoPageFlip width={24} stroke={"rgba(103, 101, 108, 1)"} />
                  프로그램 신청 내역
                </button>
              </li>

              {/* <li className="flex items-center gap-3 text-base font-medium text-gray-000">
                <IcoBookMark fill={"rgba(103, 101, 108, 1)"} />
                즐겨찾기한 프로그램
              </li> */}

              <li>
                <button
                  className="flex items-center gap-3 text-base font-medium text-gray-000"
                  onClick={() => navigate("/my?type=modify")}
                >
                  <IcoSetting
                    stroke={"rgba(103, 101, 108, 1)"}
                    fill={"rgba(103, 101, 108, 1)"}
                  />
                  개인 정보 수정
                </button>
              </li>
            </ul>
          </Section>
        </div>

        <div className="w-full flex-[0.6]">
          {type === "program" && !id && <ProgramApplication />}

          {type === "program" && id && <ProgramApplicationDetail />}

          {type === "modify" && <></>}
        </div>
      </section>
    </Container>
  );
}
