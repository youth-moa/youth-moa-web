import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Title } from "../components/common/Title";
import { BUTTON_TYPE } from "../constants/keys";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <Title title="로그인" />

      <div className={"my-9"} />

      <section className="flex flex-col w-full gap-2 max-w-96">
        <Input type="text" placeholder="아이디를 입력해주세요." />
        <Input type="password" placeholder="비밀번호를 입력해주세요." />
      </section>

      <div className={"my-4"} />

      <section className="flex flex-col w-full gap-2 max-w-96">
        <Button style={{ height: "52px" }} onClick={() => console.log("click")}>
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
    </div>
  );
}
