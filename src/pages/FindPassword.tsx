import { useLocation, useNavigate } from "react-router-dom";

import Container from "../layouts/Container";

import { Title } from "../components/common/Title";
import { IconContainer } from "../components/account/IconContainer";
import { IcoCardSearchOutlined, IcoUser } from "../assets";
import { IconLabel } from "../components/account/IconLabel";
import { Label } from "../components/common/Label";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CommonContext } from "../store/CommonContext";
import { changePassword, findPassword } from "../api/auth";
import { toast } from "react-toastify";

export default function FindPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const step = new URLSearchParams(location.search).get("step");

  const isFirstStep = step === "check";
  const isSecondStep = step === "change-password";

  const { setCommon } = useContext(CommonContext);

  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState({
    userEmail: "",
    userPhoneNumber: "",
  });
  const [password, setPassword] = useState({
    newPassword: "",
    newPasswordCheck: "",
  });
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [passwordCheckErrMsg, setPasswordCheckErrMsg] = useState("");

  useEffect(() => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (password.newPassword && !regex.test(password.newPassword)) {
      setPasswordErrMsg(
        "* 영문, 숫자, 특수문자를 포함하여 최소 8자 이상 입력해주세요."
      );
      return;
    }

    setPasswordErrMsg("");
  }, [password.newPassword]);

  useEffect(() => {
    if (password.newPassword === password.newPasswordCheck) {
      setPasswordCheckErrMsg("");
      return;
    }

    setPasswordCheckErrMsg("* 입력한 비밀번호와 일치하지 않습니다.");
  }, [password.newPassword, password.newPasswordCheck]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleFindPassword = async () => {
    if (!user.userEmail) {
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: "아이디를 입력해주세요.",
          },
        }));
      return;
    }

    if (!user.userPhoneNumber) {
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: "핸드폰번호를 입력해주세요.",
          },
        }));
      return;
    }

    try {
      const response = await findPassword(user);

      if (!response.success) {
        throw response;
      }

      if (!response.userExists) {
        throw response;
      }

      setUserId(response.userId);
      navigate("/find/password?step=change-password", { replace: true });
    } catch (error: any) {
      console.error(error);
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: error.response.data.message,
          },
        }));
    }
  };

  const handleChangePassword = async () => {
    if (!userId) return;

    try {
      const response = await changePassword({ userId, body: password });

      if (!response.success) {
        throw response;
      }

      navigate("/login", { replace: true });
      toast.success("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error: any) {
      console.error(error);
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: error.response.data.message,
          },
        }));
    }
  };

  return (
    <Container>
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
            <Label label="아이디" required />
            <Input
              placeholder="아이디를 입력해주세요."
              name="userEmail"
              value={user.userEmail}
              onChange={handleChangeValue}
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <Label label="핸드폰 번호" required />
            <Input
              type="number"
              placeholder="숫자만 입력해주세요. (ex. 01012345678)"
              name="userPhoneNumber"
              value={user.userPhoneNumber}
              onChange={handleChangeValue}
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
                name="newPassword"
                value={password.newPassword}
                onChange={handleChangePasswordValue}
                helpText={passwordErrMsg}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label label="새 비밀번호 확인" required />
              <Input
                type="password"
                placeholder="새 비밀번호를 한번 더 입력해주세요."
                name="newPasswordCheck"
                value={password.newPasswordCheck}
                onChange={handleChangePasswordValue}
                helpText={passwordCheckErrMsg}
              />
            </div>
          </section>
        </>
      )}

      <div className={"my-4"} />

      <section className="w-full max-w-96">
        <Button
          style={{ height: "52px" }}
          onClick={isFirstStep ? handleFindPassword : handleChangePassword}
        >
          확인
        </Button>
      </section>
    </Container>
  );
}
