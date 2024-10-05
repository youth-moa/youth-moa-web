import { ChangeEvent, ComponentProps, useState } from "react";
import { IcoEye, IcoEyeSlash } from "../../assets";

interface PropsType extends ComponentProps<"input"> {
  type?: "text" | "password" | "number";
  placeholder?: string;
  helpText?: string;
}

export function Input(props: PropsType) {
  const { type = "text", placeholder, helpText, ...rest } = props;

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
        className={`w-full px-4 py-3 border rounded-lg ${
          helpText ? "border-red" : "border-border-gray"
        }`}
        onChange={handleChange}
        {...rest}
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

      {helpText && (
        <p className={`absolute text-red text-xs ml-4 mt-1/2 w-max`}>
          {helpText}
        </p>
      )}
    </div>
  );
}
