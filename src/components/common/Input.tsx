import { ChangeEvent, useState } from "react";
import { IcoEye, IcoEyeSlash } from "../../assets";

interface PropsType {
  type?: "text" | "password" | "number";
  placeholder?: string;
}

// TODO: forwardRef 로 감싸기
export function Input({ type = "text", placeholder }: PropsType) {
  const [isVisible, setIsVisible] = useState(false);

  const inputType = (type === "password" && isVisible) || type === "number";

  const handleShowPw = () => {
    setIsVisible((prev) => !prev);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (type !== "number") return;

    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  return (
    <div className="relative">
      <input
        type={inputType ? "text" : type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-lg border-border-gray"
        onChange={handleChange}
      />
      {type === "password" && isVisible && (
        <IcoEye
          onClick={handleShowPw}
          className="absolute translate-x-0 -translate-y-1/2 cursor-pointer top-1/2 right-4"
        />
      )}
      {type === "password" && !isVisible && (
        <IcoEyeSlash
          onClick={handleShowPw}
          className="absolute translate-x-0 -translate-y-1/2 cursor-pointer top-1/2 right-4"
        />
      )}
    </div>
  );
}
