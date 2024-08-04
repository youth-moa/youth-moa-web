import Button from "../components/common/Button";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>로그인</h1>

      <section className="flex flex-col w-80">
        <input type="text" placeholder="아이디를 입력해주세요." />
        <input type="password" placeholder="비밀번호를 입력해주세요." />
      </section>

      <section className="flex flex-col gap-2 w-80">
        <Button label={'로그인'} />
        <Button label={'회원가입'} type="outlined" />
      </section>

      <section className="my-4">
        <button className="text-sm font-semibold text-blue">아이디 찾기</button>

        <button className="text-sm font-semibold text-blue">비밀번호 찾기</button>
      </section>
    </div>
  )
}
