import { useState } from "react";
import { ProgramApplicationType } from "../../types/program";
import { Notice } from "../common/Notice";
import { ProgramApplyCard } from "./ProgramApplyCard";
import { ProgramApplyHeader } from "./ProgramApplyHeader";
import { ProgramCancelModal } from "./ProgramCancelModal";

interface PropsType {
  programs: ProgramApplicationType[];
  refetch: any;
}

export function ProgramApplication(props: PropsType) {
  const { programs, refetch } = props;

  const [isShowCancelModal, setIsShowCancelModal] = useState(false);
  const [isNoticeShow, setIsNoticeShow] = useState(false);
  const [notice, setNotice] = useState({
    message: "",
    onClose: () => {},
    onClick: () => {},
  });

  const [programFilter, setProgramFilter] = useState(0);
  const [selected, setSelected] = useState<any>();

  const handleClickCancelProgram = (program: any) => {
    setSelected(program);
    setIsNoticeShow(true);
    setNotice({
      message: "신청 취소하시겠습니까?",
      onClick: () => {
        setIsNoticeShow(false);
        setIsShowCancelModal(true);
        refetch();
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
        isProgram={programs?.length > 0}
        handleChangeFilter={handleChangeFilter}
        programFilter={programFilter}
      />

      {programs?.map((item) => (
        <ProgramApplyCard
          key={item.programId}
          isShowCancelModal={isShowCancelModal}
          onCancelProgram={handleClickCancelProgram}
          {...item}
        />
      ))}

      {isNoticeShow && <Notice {...notice} />}

      {isShowCancelModal && selected && (
        <ProgramCancelModal
          programId={selected.programId}
          programStartDate={selected.programStartDate}
          title={selected.programName}
          image={selected.programImageUrl}
          onClose={handleCloseCancelModal}
        />
      )}
    </section>
  );
}
