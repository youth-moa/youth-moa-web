import { useLocation, useNavigate } from "react-router-dom";

import { Title } from "../components/common/Title";
import { IconContainer } from "../components/account/IconContainer";
import { IcoCardSearchOutlined, IcoUser } from "../assets";
import { IconLabel } from "../components/account/IconLabel";
import { Label } from "../components/common/Label";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export default function FindPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const step = new URLSearchParams(location.search).get("step");

  const isFirstStep = step === "check";
  const isSecondStep = step === "change-password";

  const handleClick = () => {
    if (isFirstStep) {
      navigate("/find/password?step=change-password");
      return;
    }

    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <Title title="비밀번호 찾기" />

      <div className={"my-4"} />

      <section className="flex items-center justify-center gap-4">
        <IconContainer>
          <span className="rounded-full bg-blue p-[10px]">
            <IcoUser className="w-[14px] h-[14px] md:w-6 md:h-6" />
          </span>

          <IconLabel label="가입 정보 입력" />
        </IconContainer>

        <hr
          className={`w-24 border-dotted ${
            isSecondStep ? "border-blue" : "border-gray-003"
          }`}
        />

        <IconContainer>
          <span
            className={`rounded-full p-[10px] ${
              isSecondStep ? "bg-blue" : "bg-gray-003"
            }`}
          >
            <IcoCardSearchOutlined className="w-[14px] h-[14px] md:w-6 md:h-6" />
          </span>

          <IconLabel label="비밀번호 재설정" activate={isSecondStep} />
        </IconContainer>
      </section>

      <div className={"my-8"} />

      {/* 가입 정보 입력 (check) */}
      {isFirstStep && (
        <section className="flex flex-col w-full gap-5 max-w-96">
          <div className="flex flex-col w-full gap-2">
            <Label label="이름" required />
            <Input placeholder="이름을 입력해주세요." />
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label label="핸드폰 번호" required />
            <Input
              type="number"
              placeholder="숫자만 입력해주세요. (ex. 01012345678)"
            />
          </div>
        </section>
      )}

      {/* 비밀번호 재설정 (change-password) */}
      {isSecondStep && (
        <>
          <section className="flex flex-col w-full gap-5 max-w-96">
            <div className="flex flex-col w-full gap-2">
              <Label label="새 비밀번호" required />
              <Input
                type="password"
                placeholder="새 비밀번호를 입력해주세요."
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label label="새 비밀번호 확인" required />
              <Input
                type="password"
                placeholder="새 비밀번호를 한번 더 입력해주세요."
              />
            </div>
          </section>
        </>
      )}

      <div className={"my-4"} />

      <section className="w-full max-w-96">
        <Button style={{ height: "52px" }} onClick={handleClick}>
          확인
        </Button>
      </section>
    </div>
  );
}
