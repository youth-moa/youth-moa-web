import { useState } from "react";
import { ProgramApplyCard } from "./ProgramApplyCard";
import { ProgramApplyHeader } from "./ProgramApplyHeader";
import { Notice } from "../common/Notice";

export function ProgramApplication() {
  const programs = [
    {
      programId: 1,
      programName: "프로그램A",
      applicationDate: "2024-10-09T12:41:07.715Z",
      status: "canceled" as const,
      programStartDate: "2024-10-09T12:41:07.715Z",
      programEndDate: "2024-10-09T12:41:07.715Z",
      programImageUrl: "",
    },
    {
      programId: 2,
      programName: "프로그램A",
      applicationDate: "2024-10-09T12:41:07.715Z",
      status: "approved" as const,
      programStartDate: "2024-10-09T12:41:07.715Z",
      programEndDate: "2024-10-09T12:41:07.715Z",
      programImageUrl: "",
    },
    {
      programId: 3,
      programName: "프로그램A",
      applicationDate: "2024-10-09T12:41:07.715Z",
      status: "pending" as const,
      programStartDate: "2024-10-09T12:41:07.715Z",
      programEndDate: "2024-10-09T12:41:07.715Z",
      programImageUrl: "",
    },
    {
      programId: 4,
      programName: "프로그램A",
      applicationDate: "2024-10-09T12:41:07.715Z",
      status: "rejected" as const,
      programStartDate: "2024-10-09T12:41:07.715Z",
      programEndDate: "2024-10-09T12:41:07.715Z",
      programImageUrl: "",
    },
  ];

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

  const handleChangeFilter = (filter: number) => {
    setProgramFilter(filter);
  };

  const handleCloseCancelModal = () => {
    setIsShowCancelModal(false);
  };

  return (
    <section className="flex flex-col gap-4">
      <ProgramApplyHeader
        isProgram={programs.length > 0}
        handleChangeFilter={handleChangeFilter}
        programFilter={programFilter}
      />

      {programs.map((item) => (
        <ProgramApplyCard
          key={item.programId}
          isShowCancelModal={isShowCancelModal}
          onCancelProgram={handleClickCancelProgram}
          onCloseModal={handleCloseCancelModal}
          {...item}
        />
      ))}

      {isNoticeShow && <Notice {...notice} />}
    </section>
  );
}
