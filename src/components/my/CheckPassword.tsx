import { ChangeEvent, useContext, useEffect, useState } from "react";
import { recheckPassword } from "../../api/auth";
import { CommonContext } from "../../store/CommonContext";
import { UserType } from "../../types/auth";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Label } from "../common/Label";
import { List } from "../sign-up/List";
import { SubTitle } from "./SubTitle";

interface PropsType {
  user: UserType;
  onChecked: () => void;
}

export function CheckPassword(props: PropsType) {
  const { user, onChecked } = props;

  const { setCommon } = useContext(CommonContext);

  const [userInfo, setUserInfo] = useState({
    userEmail: user?.applicantEmail,
    userPassword: "",
  });
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [userInfo.userPassword]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckPassword = async () => {
    if (!userInfo.userPassword) {
      setErrMsg("필수값입니다.");
      return;
    }

    try {
      const response = await recheckPassword(userInfo);

      if (!response.success) {
        throw response;
      }

      onChecked();
    } catch (error: any) {
      console.error(error);

      setCommon &&
        setCommon((prev) => ({
          ...prev,
          alert: {
            isShow: true,
            message: error.data.message,
          },
        }));
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <section className="flex flex-col w-full">
        <SubTitle text="개인 정보 수정" />

        <h4 className="mt-3 mb-2 text-base font-semibold text-black">
          비밀번호 재확인
        </h4>
        <p className="font-light text-gray-000">
          회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
          확인해주세요.
        </p>
      </section>

      <ul className="flex flex-col items-center justify-center w-full gap-4">
        <List>
          <Label label="아이디" className="col-span-1" />

          <div className="w-full md:col-span-3">
            <Input
              type="text"
              placeholder="아이디를 입력해주세요."
              name={"userEmail"}
              value={user?.applicantEmail}
              disabled
            />
          </div>
        </List>

        <List>
          <Label label="비밀번호" className="col-span-1" required />

          <div className="w-full md:col-span-3">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name={"userPassword"}
              onChange={handleChangeValue}
              helpText={errMsg}
            />
          </div>
        </List>
      </ul>

      <div className="h-12 w-[12.5rem]">
        <Button onClick={handleCheckPassword}>확인</Button>
      </div>
    </div>
  );
}
