import { useState } from "react";
import { IcoEye, IcoEyeSlash } from "../../assets";

interface PropsType {
  type: "text" | "password";
  placeholder?: string;
}

export function Input({ type, placeholder }: PropsType) {
  const [isVisible, setIsVisible] = useState(false);

  const inputType = type === "password" && isVisible ? "text" : type;

  const handleShowPw = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-lg border-border-gray"
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
