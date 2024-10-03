import { ComponentProps } from "react";

import { BUTTON_TYPE } from "../../constants/keys";

interface PropsType extends Omit<ComponentProps<"button">, "type"> {
  type?: "fill" | "outlined";
  onClick: () => void;
}

export function Button({
  children,
  type = BUTTON_TYPE.fill,
  onClick,
  ...rest
}: PropsType) {
  const bgColor = type === BUTTON_TYPE.outlined ? "bg-white" : "bg-blue";
  const textColor = type === BUTTON_TYPE.outlined ? "text-blue" : "text-white";
  const borderColor = type === BUTTON_TYPE.outlined ? "border-blue" : "";
  const border = type === BUTTON_TYPE.outlined ? "border" : "";

  return (
    <button
      className={`${bgColor} ${textColor} ${border} ${borderColor} h-full rounded-lg py-[15px] font-semibold w-full flex items-center justify-center disabled:bg-gray-002`}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
