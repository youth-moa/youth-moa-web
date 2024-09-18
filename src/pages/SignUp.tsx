import { useRef } from "react";

import Container from "../layouts/Container";

import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { Label } from "../components/common/Label";
import { Title } from "../components/common/Title";
import { Radio } from "../components/common/Radio";
import { Checkbox } from "../components/common/Checkbox";
import { List } from "../components/sign-up/List";
import { InputContainer } from "../components/sign-up/InputContainer";
import { DatePicker } from "../components/common/DatePicker";

import { IcoCheckOutlined, IcoNext, IcoSearch } from "../assets";
import { BUTTON_TYPE } from "../constants/keys";
// import { AccountType } from "../types/auth";

export default function SignUpPage() {
  // const [form, setForm] = useState<AccountType>({
  //   email: "",
  //   password: "",
  //   name: "",
  //   phone: "",
  //   address: "",
  //   gender: "mail",
  //   birth: "",
  // });

  const agreeSignUpRef = useRef<HTMLInputElement>(null);
  const agreePersonalInfoRef = useRef<HTMLInputElement>(null);

  const onSignUp = () => {
    if (
      !agreeSignUpRef.current?.checked ||
      !agreePersonalInfoRef.current?.checked
    ) {
      alert("동의해주세요");
      return;
    }

    // console.log(form);
  };

  console.log(
    agreePersonalInfoRef.current?.checked,
    agreeSignUpRef.current?.checked
  );

  return (
    <Container>
      <Title title="회원가입" />

      <ul className="w-full flex flex-col gap-5 my-14 max-w-[46rem] items-center justify-center md:gap-7">
        <List>
          <Label label="아이디" required className="col-span-1" />

          <InputContainer>
            <Input type="text" placeholder="아이디(이메일)을 입력해주세요." />
          </InputContainer>

          <span className="w-full h-[46px] md:col-span-1 md:ml-3">
            <Button
              type={BUTTON_TYPE.outlined}
              onClick={() => console.log("클릭")}
            >
              <span className="flex items-center justify-center gap-2">
                <IcoCheckOutlined stroke="#303CE9" />
                중복 확인
              </span>
            </Button>
          </span>
        </List>

        <List>
          <Label label="비밀번호" required className="col-span-1" />
          <InputContainer>
            <Input type="password" placeholder="비밀번호를 입력해주세요." />
          </InputContainer>
        </List>

        <List>
          <Label label="비밀번호 확인" required className="col-span-1" />
          <InputContainer>
            <Input
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요."
            />
          </InputContainer>
        </List>

        <List>
          <Label label="이름" required className="col-span-1" />
          <InputContainer>
            <Input type="text" placeholder="이름을 입력해주세요." />
          </InputContainer>
        </List>

        <List>
          <Label label="핸드폰 번호" required className="col-span-1" />
          <InputContainer>
            <Input
              type="text"
              placeholder="숫자만 입력해주세요. (ex. 01012345678)"
            />
          </InputContainer>
        </List>

        <List>
          <Label label="주소" required className="col-span-1" />
          <span className="w-full h-[46px] md:col-span-2">
            <Button
              type={BUTTON_TYPE.outlined}
              onClick={() => console.log("클릭")}
            >
              <span className="flex items-center justify-center gap-2">
                <IcoSearch />
                주소 검색
              </span>
            </Button>
          </span>
        </List>

        <List>
          <Label label="성별" required className="col-span-1" />
          <div className="flex items-center gap-24">
            <Radio
              label="남"
              name="gender"
              value="male"
              defaultChecked
              onChange={() => {}}
            />
            <Radio
              label="여"
              name="gender"
              value="female"
              onChange={() => {}}
            />
          </div>
        </List>

        <List>
          <Label label="생년월일" required className="col-span-1" />
          <InputContainer>
            <DatePicker />
          </InputContainer>
        </List>

        <li className="flex flex-col items-start w-full gap-2 md:grid md:grid-cols-4">
          <Label label="이용약관 동의" required className="col-span-1" />
          <div className="flex flex-col w-full gap-3 p-2 md:col-span-2">
            <Checkbox ref={agreeSignUpRef}>
              <div className="flex items-center justify-between w-full">
                <p>회원가입약관</p>
                <button className="flex items-center gap-2 text-blue">
                  약관보기
                  <IcoNext fill="#0264FB" />
                </button>
              </div>
            </Checkbox>

            <Checkbox ref={agreePersonalInfoRef}>
              <div className="flex items-center justify-between w-full">
                <p>개인정보처리방침안내</p>
                <button className="flex items-center gap-2 text-blue">
                  약관보기
                  <IcoNext fill="#0264FB" />
                </button>
              </div>
            </Checkbox>
          </div>
        </li>
      </ul>

      <div className="w-full md:max-w-[364px]">
        <Button onClick={onSignUp}>가입하기</Button>
      </div>
    </Container>
  );
}
