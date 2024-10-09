import { ChangeEvent, useState } from "react";
import { ModalContainer } from "../../layouts/ModalContainer";
import { Radio } from "../common/Radio";
import { Button } from "../common/Button";
import { BUTTON_TYPE } from "../../constants/keys";
import { Input } from "../common/Input";

interface PropsType {
  programId: number;
  onClose: () => void;
}

export function ProgramCancelModal(props: PropsType) {
  const { programId, onClose } = props;

  const [form, setForm] = useState({
    programId: programId,
    cancelReason: "",
    cancelOtherReason: "",
  });
  const [reasonErrorMsg, setReasonErrorMsg] = useState("");

  const handleChangeCancelReason = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    if (reasonErrorMsg) {
      setReasonErrorMsg("");
    }
  };

  const handleCancel = () => {
    if (form.cancelReason === "기타" && !form.cancelOtherReason) {
      setReasonErrorMsg("필수 입력 항목입니다.");
      return;
    }

    // TODO: 신청 취소
  };

  return (
    <ModalContainer className={"md:max-w-[35rem]"}>
      <div className="flex flex-col p-8 md:p-11 gap-11">
        <h2 className="text-lg font-semibold">프로그램 신청 취소</h2>

        <section className="flex gap-10">
          <img />
          <div></div>
        </section>

        <section>
          <h3 className="text-lg font-semibold">취소 사유 선택</h3>

          <div className="my-5" />

          <div className="flex flex-col items-start w-full gap-6">
            <Radio
              label="단순 변심"
              name="cancelReason"
              value="단순 변심"
              defaultChecked
              onChange={handleChangeCancelReason}
            />
            <Radio
              label="신청 정보 변경"
              name="cancelReason"
              value="신청 정보 변경"
              onChange={handleChangeCancelReason}
            />
            <Radio
              label="기타"
              name="cancelReason"
              value="기타"
              onChange={handleChangeCancelReason}
            />

            <div className="w-full">
              <Input
                placeholder="기타 사유를 작성해주세요 (필수)"
                disabled={form.cancelReason !== "기타"}
                helpText={reasonErrorMsg}
              />
            </div>
          </div>
        </section>

        <div className="flex w-full gap-3 h-9">
          <Button
            type={BUTTON_TYPE.outlined}
            color={"bg-white border-gray-000 text-gray-000"}
            onClick={onClose}
          >
            돌아가기
          </Button>
          <Button onClick={handleCancel}>확인</Button>
        </div>
      </div>
    </ModalContainer>
  );
}
