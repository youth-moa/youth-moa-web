import { ReactNode, useState } from "react";
import { ProgramApplyCard } from "./ProgramApplyCard";
import { ProgramApplyHeader } from "./ProgramApplyHeader";
import { Notice } from "../common/Notice";
import { Section } from "./Section";
import { SubTitle } from "./SubTitle";
import { Label } from "../common/Label";
import { Button } from "../common/Button";

export function ProgramApplicationDetail() {
  const program = {
    programId: 1,
    programName: "프로그램A",
    applicationDate: "2024-10-09T12:41:07.715Z",
    status: "canceled" as const,
    programStartDate: "2024-10-09T12:41:07.715Z",
    programEndDate: "2024-10-09T12:41:07.715Z",
    programImageUrl: "",
  };

  const [isShowCancelModal, setIsShowCancelModal] = useState(false);
  const [isNoticeShow, setIsNoticeShow] = useState(false);
  const [notice, setNotice] = useState({
    message: "",
    onClose: () => {},
    onClick: () => {},
  });

  const [programFilter, setProgramFilter] = useState(0);

  const handleClickCancelProgram = (programId: number) => {
    setIsNoticeShow(true);
    setNotice({
      message: "신청 취소하시겠습니까?",
      onClick: () => {
        setIsNoticeShow(false);
        setIsShowCancelModal(true);
      },
      onClose: () => setIsNoticeShow(false),
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <Section>
        <SubTitle text="프로그램 신청 상세" />

        <div className="my-1" />
      </Section>

      <Section>
        <SubTitle text="신청자 정보" />

        <ul className="flex flex-col items-center justify-center w-full gap-4 mt-5">
          <List>
            <Label label="이름" className="col-span-1" />

            <div className="w-full col-span-3">청년모아</div>
          </List>

          <List>
            <Label label="핸드폰 번호" className="col-span-1" />

            <div className="w-full col-span-3">010-0000-0000</div>
          </List>

          <List>
            <Label label="성별" className="col-span-1" />

            <div className="w-full col-span-3">여</div>
          </List>

          <List>
            <Label label="생년월일" className="col-span-1" />

            <div className="w-full col-span-3">1999-00-00</div>
          </List>

          <List>
            <Label label="주소" className="col-span-1" />

            <div className="w-full col-span-3">주소</div>
          </List>
        </ul>
      </Section>

      <Section>
        <SubTitle text="신청 이력" />

        <ul className="flex flex-col items-center justify-center w-full gap-4 mt-5">
          <List>
            <Label label="신청일시" className="col-span-1" />

            <div className="w-full col-span-3">2024-07-05 17:11:31</div>
          </List>

          <List>
            <Label label="승인일시" className="col-span-1" />

            <div className="w-full col-span-3">2024-07-05 17:11:31</div>
          </List>

          <List>
            <Label label="담당자 의견" className="col-span-1" />

            <div className="w-full col-span-3">
              프로그램 취소 신청은 프로그램 시작일의 최소 2일 전까지
              부탁드립니다. 프로그램 당일 취소·노쇼 2회 이상 시 프로그램 참여가
              제한됩니다.
            </div>
          </List>
        </ul>
      </Section>

      <Button onClick={() => handleClickCancelProgram(program.programId)}>
        프로그램 신청 취소
      </Button>

      {isNoticeShow && <Notice {...notice} />}
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <li className="grid items-start justify-center w-full grid-cols-4">
      {children}
    </li>
  );
}
