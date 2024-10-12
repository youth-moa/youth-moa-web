import { useState } from "react";
import { UserType } from "../../types/auth";
import { CheckPassword } from "./CheckPassword";
import { PersonalInfo } from "./PersonalInfo";
import { Section } from "./Section";

interface PropsType {
  user: UserType;
}

export function EditAccount(props: PropsType) {
  const { user } = props;

  const [isCheckedPassword, setIsCheckedPassword] = useState(false);

  const hancleCheckPassword = () => {
    setIsCheckedPassword(true);
  };

  return (
    <Section>
      {!isCheckedPassword && (
        <CheckPassword user={user} onChecked={hancleCheckPassword} />
      )}

      {isCheckedPassword && <PersonalInfo user={user} />}
    </Section>
  );
}
