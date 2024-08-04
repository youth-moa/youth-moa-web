import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-5">
      <h1 className="text-2xl font-semibold">로그인</h1>

      <div className={'my-9'} />

      <section className="flex flex-col w-full gap-2 max-w-96">
        <Input type="text" placeholder="아이디를 입력해주세요." />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          password={true}
        />
      </section>

      <div className={'my-4'} />

      <section className="flex flex-col w-full gap-2 max-w-96">
        <Button 
        label={'로그인'} 
        onClick={() => console.log('click')}
        />
        <Button
         label={'회원가입'}
          type="outlined" 
          onClick={() => navigate('/sign-up')}
         />
      </section>

      <div className={'my-2'} />

      <section className="flex items-center gap-2 text-blue">
        <button className="h-full px-2 text-sm font-semibold">아이디 찾기</button>
        <span className="w-[2px] h-[14px] bg-blue" />
        <button className="h-full px-2 text-sm font-semibold">비밀번호 찾기</button>
      </section>
    </div>
  )
}
