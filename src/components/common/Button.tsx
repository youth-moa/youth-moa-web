import { ComponentProps } from "react";

import { BUTTON_TYPE } from "../../constants/keys";

interface PropsType extends Omit<ComponentProps<"button">, "type"> {
  label: string;
  type?: "fill" | "outlined";
  onClick: () => void;
}

export function Button({ label, type = BUTTON_TYPE.fill, onClick }: PropsType) {
  const bgColor = type === BUTTON_TYPE.outlined ? "bg-white" : "bg-blue";
  const textColor = type === BUTTON_TYPE.outlined ? "text-blue" : "text-white";
  const borderColor = type === BUTTON_TYPE.outlined ? "border-blue" : "";
  const border = type === BUTTON_TYPE.outlined ? "border" : "";

  return (
    <button
      className={`${bgColor} ${textColor} ${border} ${borderColor} rounded-lg py-[15px] font-semibold`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
