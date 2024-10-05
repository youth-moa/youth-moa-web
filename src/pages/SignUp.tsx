import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
import { AddressModal } from "../components/home/AddressModal";

import {
  IcoCheckFilled,
  IcoCheckOutlined,
  IcoNext,
  IcoSearch,
} from "../assets";
import { BUTTON_TYPE } from "../constants/keys";
import { AccountType } from "../types/auth";
import { checkEmail, signUp } from "../api/auth";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [isCheckEmail, setIsCheckEmail] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [address, setAddress] = useState({
    mainAddress: "",
    detailAddress: "",
  });
  const [user, setUser] = useState<AccountType>({
    userEmail: "",
    userPassword: "",
    userPasswordCheck: "",
    userName: "",
    userPhoneNumber: "",
    userAddress: "",
    userGender: "M",
    userBirthday: "",
    termsOfService: false,
    personalAgree: false,
  });
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordCheckErrorMsg, setPasswordCheckErrorMsg] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState("");
  const [addressErrorMsg, setAddressErrorMsg] = useState("");
  const [birthdayErrorMsg, setBirthdayErrorMsg] = useState("");

  useEffect(() => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (user.userPassword && !regex.test(user.userPassword)) {
      setPasswordErrorMsg(
        "* 영문, 숫자, 특수문자를 포함하여 최소 8자 이상 입력해주세요."
      );
      return;
    }

    setPasswordErrorMsg("");
  }, [user.userPassword]);

  useEffect(() => {
    if (user.userPassword === user.userPasswordCheck) {
      setPasswordCheckErrorMsg("");
      return;
    }

    setPasswordCheckErrorMsg("* 입력한 비밀번호와 일치하지 않습니다.");
  }, [user.userPasswordCheck, user.userPassword]);

  useEffect(() => {
    if (user.userBirthday) {
      setBirthdayErrorMsg("");
    }
  }, [user.userBirthday]);

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (name === "userEmail") {
      setIsCheckEmail(false);
      setEmailErrorMsg("");
    }
  };

  const handleCheckEmail = async () => {
    if (!user.userEmail) {
      setEmailErrorMsg("* 이메일을 입력해주세요.");
      return;
    }

    setEmailErrorMsg("");

    try {
      const response = await checkEmail(user.userEmail);
      console.log(response);

      if (!response.success) {
        throw response;
      }

      setIsCheckEmail(true);
    } catch (error: any) {
      console.error(error);
      setEmailErrorMsg(error.response.data.message);
    }
  };

  const validUserInfo = (user: AccountType) => {
    let isValid = true;

    if (!user.userEmail) {
      setEmailErrorMsg("* 이메일을 입력해주세요.");
      isValid = false;
    } else if (!isCheckEmail) {
      setEmailErrorMsg("* 아이디 중복확인이 필요합니다.");
      isValid = false;
    } else setEmailErrorMsg("");

    if (!user.userPassword) {
      setPasswordErrorMsg("* 비밀번호를 입력해주세요.");
      isValid = false;
    } else setPasswordErrorMsg("");

    if (!user.userPasswordCheck) {
      setPasswordCheckErrorMsg("* 비밀번호를 한번 더 입력해주세요.");
      isValid = false;
    } else setPasswordCheckErrorMsg("");

    if (!user.userName) {
      setNameErrorMsg("* 이름을 입력해주세요.");
      isValid = false;
    } else setNameErrorMsg("");

    if (!user.userPhoneNumber) {
      setPhoneNumberErrorMsg("* 핸드폰번호를 입력해주세요.");
      isValid = false;
    } else setPhoneNumberErrorMsg("");

    if (!address.mainAddress) {
      setAddressErrorMsg("* 주소를 입력해주세요.");
      isValid = false;
    } else setAddressErrorMsg("");

    if (!user.userBirthday) {
      setBirthdayErrorMsg("* 생년월일을 입력해주세요.");
      isValid = false;
    } else setBirthdayErrorMsg("");

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validUserInfo(user)) {
      return;
    }

    if (!user.termsOfService || !user.personalAgree) {
      toast.error("약관 동의가 필요합니다.");
      return;
    }

    const body = {
      ...user,
      userAddress: `${address.mainAddress} ${address.detailAddress}`,
    };

    try {
      const response = await signUp(body);

      if (!response.success) {
        throw response;
      }

      navigate("/login");
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleChangeAddress = (address: string) => {
    setAddress((prev) => ({ ...prev, mainAddress: address }));
  };

  return (
    <>
      <Container>
        <Title title="회원가입" />

        <ul className="w-full flex flex-col gap-5 my-14 max-w-[46rem] items-center justify-center md:gap-7">
          <List>
            <Label label="아이디" required className="col-span-1" />

            <InputContainer>
              <Input
                type="text"
                placeholder="아이디(이메일)을 입력해주세요."
                name={"userEmail"}
                onChange={handleChangeUser}
                helpText={emailErrorMsg}
              />
            </InputContainer>

            <span
              className={`w-full h-[46px] md:col-span-1 md:ml-3 md:mt-0 ${
                emailErrorMsg ? "mt-2" : ""
              }`}
            >
              <Button
                type={BUTTON_TYPE.outlined}
                onClick={handleCheckEmail}
                disabled={isCheckEmail}
              >
                <span className="flex items-center justify-center gap-2">
                  {isCheckEmail ? (
                    <IcoCheckFilled width={18} height={18} fill="white" />
                  ) : (
                    <IcoCheckOutlined stroke="#303CE9" />
                  )}
                  중복 확인
                </span>
              </Button>
            </span>
          </List>

          <List>
            <Label label="비밀번호" required className="col-span-1" />
            <InputContainer>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                name="userPassword"
                value={user.userPassword}
                onChange={handleChangeUser}
                helpText={passwordErrorMsg}
              />
            </InputContainer>
          </List>

          <List>
            <Label label="비밀번호 확인" required className="col-span-1" />
            <InputContainer>
              <Input
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요."
                name="userPasswordCheck"
                value={user.userPasswordCheck}
                onChange={handleChangeUser}
                helpText={passwordCheckErrorMsg}
              />
            </InputContainer>
          </List>

          <List>
            <Label label="이름" required className="col-span-1" />
            <InputContainer>
              <Input
                type="text"
                placeholder="이름을 입력해주세요."
                name="userName"
                value={user.userName}
                onChange={handleChangeUser}
                helpText={nameErrorMsg}
              />
            </InputContainer>
          </List>

          <List>
            <Label label="핸드폰 번호" required className="col-span-1" />
            <InputContainer>
              <Input
                type="text"
                placeholder="숫자만 입력해주세요. (ex. 01012345678)"
                name="userPhoneNumber"
                value={user.userPhoneNumber}
                onChange={handleChangeUser}
                helpText={phoneNumberErrorMsg}
              />
            </InputContainer>
          </List>

          {!address.mainAddress && (
            <List>
              <Label label="주소" required className="col-span-1" />
              {!user.userAddress && (
                <span className="relative w-full h-[46px] md:col-span-2">
                  <Button
                    type={BUTTON_TYPE.outlined}
                    onClick={() => setIsAddressOpen(true)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <IcoSearch />
                      주소 검색
                    </span>
                  </Button>

                  {addressErrorMsg && (
                    <p
                      className={`absolute text-red text-xs ml-4 mt-1/2 w-max`}
                    >
                      {addressErrorMsg}
                    </p>
                  )}
                </span>
              )}
            </List>
          )}

          {address.mainAddress && (
            <li className="flex flex-col items-start w-full gap-2 md:grid md:grid-cols-4">
              <Label label="주소" required className="col-span-1" />
              <div className="flex flex-col w-full gap-3 md:col-span-2">
                <Input
                  type="text"
                  name="detailAddress"
                  disabled
                  value={address.mainAddress}
                />

                <span className="w-full h-[46px] md:col-span-2">
                  <Input
                    type="text"
                    placeholder="상세주소를 입력해주세요."
                    name="detailAddress"
                    value={address.detailAddress}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        detailAddress: e.target.value,
                      }))
                    }
                  />
                </span>
              </div>

              <span className="w-full h-[46px] md:col-span-1 md:ml-3">
                <Button
                  type={BUTTON_TYPE.outlined}
                  onClick={() => setIsAddressOpen(true)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <IcoSearch stroke="#303CE9" />
                    재검색
                  </span>
                </Button>
              </span>
            </li>
          )}

          <List>
            <Label label="성별" required className="col-span-1" />
            <div className="flex items-center gap-24">
              <Radio
                label="남"
                name="userGender"
                value="M"
                defaultChecked
                onChange={handleChangeUser}
              />
              <Radio
                label="여"
                name="userGender"
                value="F"
                onChange={handleChangeUser}
              />
            </div>
          </List>

          <List>
            <Label label="생년월일" required className="col-span-1" />
            <InputContainer>
              <DatePicker
                name="userBirthday"
                onChange={handleChangeUser}
                helpText={birthdayErrorMsg}
              />
            </InputContainer>
          </List>

          <li className="flex flex-col items-start w-full gap-2 md:grid md:grid-cols-4">
            <Label label="이용약관 동의" required className="col-span-1" />
            <div className="flex flex-col w-full gap-3 p-2 md:col-span-2">
              <Checkbox
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    termsOfService: e.target.checked,
                  }))
                }
              >
                <div className="flex items-center justify-between w-full">
                  <p>회원가입약관</p>
                  <button className="flex items-center gap-2 text-blue">
                    약관보기
                    <IcoNext fill="#0264FB" />
                  </button>
                </div>
              </Checkbox>

              <Checkbox
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    personalAgree: e.target.checked,
                  }))
                }
              >
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
          <Button onClick={handleSignUp}>가입하기</Button>
        </div>
      </Container>

      {isAddressOpen && (
        <AddressModal
          onClose={() => setIsAddressOpen(false)}
          onChangeAddress={handleChangeAddress}
        />
      )}
    </>
  );
}
