import { useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProgramDetail } from "../../api/program";
import { BUTTON_TYPE, GENDER } from "../../constants/keys";
import { ProgramKey } from "../../queries/keys";
import { UserType } from "../../types/auth";
import { dateFormat } from "../../utils";
import { Button } from "../common/Button";
import { Label } from "../common/Label";
import { Notice } from "../common/Notice";
import { StatusBadge } from "../common/StatusBadge";
import { ProgramCancelModal } from "./ProgramCancelModal";
import { Section } from "./Section";
import { SubTitle } from "./SubTitle";

interface PropsType {
  programId: number;
  user: UserType;
  userRefetch: any;
}

export function ProgramApplicationDetail(props: PropsType) {
  const { programId, user, userRefetch } = props;

  const navigate = useNavigate();

  const [isShowCancelModal, setIsShowCancelModal] = useState(false);
  const [isNoticeShow, setIsNoticeShow] = useState(false);
  const [notice, setNotice] = useState({
    message: "",
    onClose: () => {},
    onClick: () => {},
  });

  const { data: program } = useQuery({
    queryKey: [ProgramKey.program, "detail", { id: programId }],
    queryFn: async () => {
      const data = getProgramDetail(programId);

      return data;
    },
  });

  const handleClickCancelProgram = () => {
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

  const handleCloseCancelModal = () => {
    setIsShowCancelModal(false);
  };

  if (!program) {
    return;
  }

  return (
    <section className="flex flex-col gap-4">
      <Section>
        <SubTitle text="프로그램 신청 상세" />

        <section className="flex gap-3 mt-5 md:gap-10">
          {program.programApplication.programImageUrl && (
            <img
              src={program.programApplication.programImageUrl}
              alt="thumbnail"
              className="object-cover w-32 h-32 rounded-lg"
            />
          )}

          <section className="w-full">
            <div className="flex items-center w-full gap-3">
              <h3 className="text-sm font-semibold md:text-lg">
                {program.programApplication.programName}
              </h3>
              <StatusBadge
                status={program.programApplication.applicationStatus}
                padding="md:px-4 px-3"
              />
            </div>

            <div className="my-1" />

            <span>
              {dateFormat(program.programApplication.programStartDate)}
            </span>
          </section>
        </section>
      </Section>

      <Section>
        <SubTitle text="신청자 정보" />

        <ul className="flex flex-col items-center justify-center w-full gap-4 mt-5">
          <List>
            <Label label="이름" className="col-span-1" />

            <div className="w-full col-span-3">{user?.applicantName}</div>
          </List>

          <List>
            <Label label="핸드폰 번호" className="col-span-1" />

            <div className="w-full col-span-3">
              {user?.applicantPhoneNumber}
            </div>
          </List>

          <List>
            <Label label="성별" className="col-span-1" />

            <div className="w-full col-span-3">
              {GENDER[user.applicantGender]}
            </div>
          </List>

          <List>
            <Label label="생년월일" className="col-span-1" />

            <div className="w-full col-span-3">{user.applicantBirthday}</div>
          </List>

          <List>
            <Label label="주소" className="col-span-1" />

            <div className="w-full col-span-3">
              {user?.applicantMainAddress} {user?.applicantDetailAddress}
            </div>
          </List>
        </ul>
      </Section>

      <Section>
        <SubTitle text="신청 이력" />

        <ul className="flex flex-col items-center justify-center w-full gap-4 mt-5">
          <List>
            <Label label="신청일시" className="col-span-1" />

            <div className="w-full col-span-3">
              {dateFormat(program.applicationDate)}
            </div>
          </List>

          <List>
            <Label
              label={
                program.programApplication.applicationStatus === "canceled"
                  ? "취소일시"
                  : program.programApplication.applicationStatus === "rejected"
                  ? "반려일시"
                  : "승인일시"
              }
              className="col-span-1"
            />

            <div className="w-full col-span-3">
              {program.programApplication.applicationStatus === "canceled" ||
              program.programApplication.applicationStatus === "rejected"
                ? dateFormat(program.cancelDate)
                : dateFormat(program.approvalDate)}
            </div>
          </List>

          {program.adminComment && (
            <List>
              <Label label="담당자 의견" className="col-span-1" />

              <div className="w-full col-span-3">{program.adminComment}</div>
            </List>
          )}
        </ul>
      </Section>

      {(program.programApplication.applicationStatus === "pending" ||
        program.programApplication.applicationStatus === "approved") && (
        <Button onClick={handleClickCancelProgram}>프로그램 신청 취소</Button>
      )}

      {(program.programApplication.applicationStatus === "canceled" ||
        program.programApplication.applicationStatus === "rejected") && (
        <Button
          type={BUTTON_TYPE.outlined}
          onClick={() => navigate(`/program/apply/${programId}`)}
        >
          재신청
        </Button>
      )}

      {isNoticeShow && <Notice {...notice} />}

      {isShowCancelModal && (
        <ProgramCancelModal
          programId={programId}
          programStartDate={program.programApplication.programStartDate}
          title={program.programApplication.programName}
          image={program.programApplication.programImageUrl}
          onClose={handleCloseCancelModal}
          refetch={userRefetch}
        />
      )}
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
