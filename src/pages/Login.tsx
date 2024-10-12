import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../layouts/Container";

import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Title } from "../components/common/Title";

import { login } from "../api/auth";
import { BUTTON_TYPE } from "../constants/keys";
import { CommonContext } from "../store/CommonContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("accessToken");

  if (isLogin) {
    navigate("/");
    return;
  }

  const { setCommon } = useContext(CommonContext);

  const [user, setUser] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!user.userEmail) {
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: "이메일을 입력해주세요.",
          },
        }));
      return;
    }

    if (!user.userPassword) {
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: "비밀번호를 입력해주세요.",
          },
        }));
      return;
    }

    try {
      const response = await login(user);

      if (!response.success) {
        throw response;
      }

      // 토큰 저장
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      navigate("/");
    } catch (error: any) {
      console.error(error);
      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message:
              "가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해주세요.",
          },
        }));
    }
  };
  return (
    <Container>
      <Title title="로그인" />

      <div className={"my-9"} />

      <section className="flex flex-col w-full gap-2 max-w-96">
        <Input
          type="text"
          placeholder="아이디를 입력해주세요."
          name="userEmail"
          value={user.userEmail}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          name="userPassword"
          value={user.userPassword}
          onChange={handleChange}
        />
      </section>

      <div className={"my-4"} />

      <section className="flex flex-col w-full gap-2 max-w-96">
        <Button style={{ height: "52px" }} onClick={handleLogin}>
          로그인
        </Button>
        <Button
          type={BUTTON_TYPE.outlined}
          style={{ height: "52px" }}
          onClick={() => navigate("/sign-up")}
        >
          회원가입
        </Button>
      </section>

      <div className={"my-2"} />

      <section className="flex items-center gap-2 text-blue">
        <button
          className="h-full px-2 text-sm font-semibold"
          onClick={() => navigate("/find/id?step=check")}
        >
          아이디 찾기
        </button>
        <span className="w-[2px] h-[14px] bg-blue" />
        <button
          className="h-full px-2 text-sm font-semibold"
          onClick={() => navigate("/find/password?step=check")}
        >
          비밀번호 찾기
        </button>
      </section>
    </Container>
  );
}
