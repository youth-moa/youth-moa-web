import { useNavigate } from "react-router-dom";
import { IcoCancelOutlined, IcoNext } from "../../assets";
import { BUTTON_TYPE } from "../../constants/keys";
import { ProgramApplicationType } from "../../types/program";
import { dateFormat } from "../../utils";
import { Button } from "../common/Button";
import { StatusBadge } from "../common/StatusBadge";
import { Section } from "./Section";
import { ProgramCancelModal } from "./ProgramCancelModal";

interface PropsType extends ProgramApplicationType {
  isShowCancelModal: boolean;
  onCancelProgram: (id: number) => void;
  onCloseModal: () => void;
}

export function ProgramApplyCard(props: PropsType) {
  const {
    isShowCancelModal,
    programId,
    programName,
    applicationDate,
    status,
    programStartDate,
    programImageUrl,
    onCancelProgram,
    onCloseModal,
  } = props;

  const navigate = useNavigate();

  return (
    <Section>
      <button
        className="flex items-center justify-end w-full text-sm"
        onClick={() => navigate(`/my?type=program&id=${programId}`)}
      >
        신청 상세
        <IcoNext width={19} fill="rgba(117, 117, 117, 1)" />
      </button>

      <section className="flex items-center gap-3 md:gap-10">
        <img
          src={programImageUrl}
          className="object-cover w-32 h-32 rounded-lg"
        />

        <section className="w-full">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold md:text-lg">{programName}</h3>
            <StatusBadge status={status} padding="md:px-4 px-3" />
          </div>

          <div className="my-1" />

          <ul className="text-xs font-normal md:text-base text-gray-000">
            <li>진행 일시: {dateFormat(programStartDate)}</li>
            <li>신청 일시: {dateFormat(applicationDate)}</li>
          </ul>

          <div className="mt-3 h-7 md:h-9">
            {(status === "approved" || status === "pending") && (
              <Button
                type={BUTTON_TYPE.outlined}
                onClick={() => onCancelProgram(programId)}
                isError
              >
                <span className="flex items-center gap-2 font-semibold text-[10px] md:text-sm">
                  <IcoCancelOutlined fill="#FF3932" />
                  신청취소
                </span>
              </Button>
            )}

            {(status === "rejected" || status === "canceled") && (
              <Button
                type={BUTTON_TYPE.outlined}
                onClick={() => navigate(`/program/apply/${programId}`)}
              >
                <span className="flex items-center gap-2 font-semibold text-[10px] md:text-sm">
                  재신청
                </span>
              </Button>
            )}
          </div>
        </section>
      </section>

      {isShowCancelModal && (
        <ProgramCancelModal programId={programId} onClose={onCloseModal} />
      )}
    </Section>
  );
}
