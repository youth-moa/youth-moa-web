import { useNavigate } from "react-router-dom";
import { IcoPageFlip } from "../../assets";
import { Button } from "../common/Button";
import { Section } from "./Section";
import { SubTitle } from "./SubTitle";

interface PropsType {
  isProgram?: boolean;
  programFilter: number;
  handleChangeFilter: (filter: number) => void;
}

export function ProgramApplyHeader(props: PropsType) {
  const { isProgram } = props;

  const navigate = useNavigate();

  return (
    <Section>
      <SubTitle text="프로그램 신청내역" />

      <div className="my-1" />

      <p className="font-light text-gray-000">
        최대 지난 3년간의 프로그램 신청 내역까지 확인할 수 있어요
      </p>

      {/* 프로그램 신청 내역이 없는 경우 */}
      {!isProgram && (
        <section className="flex flex-col items-center justify-center w-full gap-4 mt-11">
          <IcoPageFlip stroke="#B3B3B3" width={44} height={44} />
          <p className="text-gray-000">신청한 프로그램이 없습니다.</p>

          <div className="w-48">
            <Button rounded="large" onClick={() => navigate("/program")}>
              프로그램 보기
            </Button>
          </div>
        </section>
      )}
    </Section>
  );
}
