import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "../layouts/Container";

import { Input } from "../components/common/Input";
import { Title } from "../components/common/Title";
import { IcoCardSearchOutlined, IcoSetting, IcoUser } from "../assets";
import { Label } from "../components/common/Label";
import { Button } from "../components/common/Button";
import { BUTTON_TYPE } from "../constants/keys";
import { IconContainer } from "../components/account/IconContainer";
import { IconLabel } from "../components/account/IconLabel";

export default function FindIdPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const step = new URLSearchParams(location.search).get("step");

  const isFirstStep = step === "check";
  const isSecondStep = step === "results";

  const [userInfo, setUserInfo] = useState({
    email: "",
    createdAt: "",
  });

  const handleFindId = () => {
    navigate("/find/id?step=results");
  };

  useEffect(() => {
    setUserInfo({
      email: "eodrmfdl1004@naver.com",
      createdAt: "2024.01.11",
    });
  }, []);

  return (
    <Container>
      <Title title="아이디 찾기" />

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

          <IconLabel label="아이디 찾기" activate={isSecondStep} />
        </IconContainer>
      </section>

      <div className={"my-8"} />

      {/* 가입 정보 입력 (check) */}
      {isFirstStep && (
        <>
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

          <div className={"my-4"} />

          <section className="w-full max-w-96">
            <Button style={{ height: "52px" }} onClick={handleFindId}>
              확인
            </Button>
          </section>
        </>
      )}

      {/* 아이디 찾기 (results) */}
      {isSecondStep && (
        <>
          <section className="flex flex-col w-full gap-8 max-w-96">
            <div className="flex flex-col items-center gap-1">
              <p className="text-lg">
                입력해주신 가입 정보로 계정을 찾았습니다.
              </p>
              <p className="text-gray-002">아이디 확인 후 로그인해주세요.</p>
            </div>

            <div className="flex items-center px-8 py-6 rounded-md bg-gray-005 text-start md:gap-[14px]">
              <IcoSetting className="w-[39px] h-[39px] m-2" />

              <div>
                <p className="text-lg font-semibold">{userInfo.email}</p>
                <p className="text-sm text-gray-002">
                  가입일 {userInfo.createdAt}
                </p>
              </div>
            </div>
          </section>

          <div className={"my-4"} />

          <section className="flex flex-col w-full gap-2 max-w-96">
            <Button
              type={BUTTON_TYPE.outlined}
              style={{ height: "52px" }}
              onClick={() => navigate("/find/password?step=check")}
            >
              비밀번호 찾기
            </Button>
            <Button
              style={{ height: "52px" }}
              onClick={() => navigate("/login")}
            >
              로그인
            </Button>
          </section>
        </>
      )}
    </Container>
  );
}
