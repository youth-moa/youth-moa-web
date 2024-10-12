import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUser, editPersonalInfo } from "../../api/auth";
import { IcoSearch } from "../../assets";
import { BUTTON_TYPE } from "../../constants/keys";
import { AccountType, UserType } from "../../types/auth";
import { Button } from "../common/Button";
import { DatePicker } from "../common/DatePicker";
import { Input } from "../common/Input";
import { Label } from "../common/Label";
import { Notice } from "../common/Notice";
import { Radio } from "../common/Radio";
import { AddressModal } from "../home/AddressModal";
import { InputContainer } from "../sign-up/InputContainer";
import { List } from "../sign-up/List";
import { SubTitle } from "./SubTitle";

interface PropsType {
  user: UserType;
}

export function PersonalInfo(props: PropsType) {
  const { user } = props;

  const navigate = useNavigate();

  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isNoticeShow, setIsNoticeShow] = useState(false);
  const [notice, setNotice] = useState({
    message: "",
    onClose: () => {},
    onClick: () => {},
  });
  const [form, setForm] = useState<AccountType>({
    userEmail: user?.applicantEmail,
    userPassword: "",
    userPasswordCheck: "",
    userName: user?.applicantName,
    userPhoneNumber: user?.applicantPhoneNumber,
    userMainAddress: user?.applicantMainAddress,
    userDetailAddress: user?.applicantDetailAddress,
    userGender: user.applicantGender,
    userBirthday: user.applicantBirthday,
    termsOfService: true,
    personalAgree: true,
  });
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [passwordCheckErrorMsg, setPasswordCheckErrorMsg] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState("");
  const [addressErrorMsg, setAddressErrorMsg] = useState("");
  const [birthdayErrorMsg, setBirthdayErrorMsg] = useState("");

  useEffect(() => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (form.userPassword && !regex.test(form.userPassword)) {
      setPasswordErrorMsg(
        "* 영문, 숫자, 특수문자를 포함하여 최소 8자 이상 입력해주세요."
      );
      return;
    }

    setPasswordErrorMsg("");
  }, [form.userPassword]);

  useEffect(() => {
    if (form.userPassword === form.userPasswordCheck) {
      setPasswordCheckErrorMsg("");
      return;
    }

    setPasswordCheckErrorMsg("* 입력한 비밀번호와 일치하지 않습니다.");
  }, [form.userPasswordCheck, form.userPassword]);

  const handleChangeAddress = (address: string) => {
    setForm((prev) => ({ ...prev, userMainAddress: address }));
  };

  const validUserInfo = (user: AccountType) => {
    let isValid = true;

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

    if (!form.userMainAddress) {
      setAddressErrorMsg("* 주소를 입력해주세요.");
      isValid = false;
    } else setAddressErrorMsg("");

    if (!user.userBirthday) {
      setBirthdayErrorMsg("* 생년월일을 입력해주세요.");
      isValid = false;
    } else setBirthdayErrorMsg("");

    return isValid;
  };

  const handleEditPersonalInfo = async () => {
    if (!validUserInfo(form)) {
      return;
    }

    try {
      const response = await editPersonalInfo(form);

      if (!response.success) {
        throw response;
      }

      navigate("/", { replace: true });
      toast.success("회원 정보가 수정되었습니다.");
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickDeleteUser = () => {
    setIsNoticeShow(true);
    setNotice({
      message: "정말 탈퇴하시겠습니까?",
      onClick: handleDeleteUser,
      onClose: () => setIsNoticeShow(false),
    });
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(form.userEmail);

      if (!response.success) {
        throw response;
      }

      navigate("/", { replace: true });
      toast.success("탈퇴처리되었습니다.");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <SubTitle text="개인 정보 수정" />

        <ul className="w-full flex flex-col gap-5 max-w-[46rem] items-center justify-center md:gap-7">
          <List>
            <Label label="아이디" required className="col-span-1" />

            <InputContainer>
              <Input
                type="text"
                placeholder="아이디(이메일)을 입력해주세요."
                name={"userEmail"}
                value={form.userEmail}
                disabled
              />
            </InputContainer>
          </List>

          <List>
            <Label label="비밀번호" required className="col-span-1" />
            <InputContainer>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                name="userPassword"
                value={form.userPassword}
                onChange={handleChangeValue}
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
                value={form.userPasswordCheck}
                onChange={handleChangeValue}
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
                value={form.userName}
                onChange={handleChangeValue}
                helpText={nameErrorMsg}
              />
            </InputContainer>
          </List>

          <List>
            <Label label="핸드폰 번호" required className="col-span-1" />
            <InputContainer>
              <Input
                type="number"
                placeholder="숫자만 입력해주세요. (ex. 01012345678)"
                name="userPhoneNumber"
                value={form.userPhoneNumber}
                onChange={handleChangeValue}
                helpText={phoneNumberErrorMsg}
              />
            </InputContainer>
          </List>

          <li className="flex flex-col items-start w-full gap-2 md:grid md:grid-cols-4">
            <Label label="주소" required className="col-span-1" />
            <div className="flex flex-col w-full gap-3 md:col-span-2">
              <Input
                type="text"
                name="userMetailAddress"
                disabled
                value={form.userMainAddress}
                helpText={addressErrorMsg}
              />

              <span className="w-full h-[46px] md:col-span-2">
                <Input
                  type="text"
                  placeholder="상세주소를 입력해주세요."
                  name="userDetailAddress"
                  value={form.userDetailAddress}
                  onChange={handleChangeValue}
                />
              </span>
            </div>

            <span className="w-full h-[46px] md:col-span-1 md:ml-3">
              <Button onClick={() => setIsAddressOpen(true)}>
                <span className="flex items-center justify-center gap-2">
                  <IcoSearch stroke="white" />
                  재검색
                </span>
              </Button>
            </span>
          </li>

          <List>
            <Label label="성별" required className="col-span-1" />
            <div className="flex items-center gap-24">
              <Radio
                label="남"
                name="userGender"
                value="M"
                checked={form.userGender === "M"}
                onChange={handleChangeValue}
              />
              <Radio
                label="여"
                name="userGender"
                value="F"
                checked={form.userGender === "F"}
                onChange={handleChangeValue}
              />
            </div>
          </List>

          <List>
            <Label label="생년월일" required className="col-span-1" />
            <InputContainer>
              <DatePicker
                name="userBirthday"
                value={form.userBirthday}
                onChange={handleChangeValue}
                helpText={birthdayErrorMsg}
              />
            </InputContainer>
          </List>
        </ul>

        <section className="flex items-center w-full gap-3">
          <Button type={BUTTON_TYPE.outlined} onClick={handleClickDeleteUser}>
            탈퇴하기
          </Button>
          <Button onClick={handleEditPersonalInfo}>회원정보 수정</Button>
        </section>
      </div>

      {isAddressOpen && (
        <AddressModal
          onClose={() => setIsAddressOpen(false)}
          onChangeAddress={handleChangeAddress}
        />
      )}

      {isNoticeShow && <Notice {...notice} />}
    </>
  );
}
