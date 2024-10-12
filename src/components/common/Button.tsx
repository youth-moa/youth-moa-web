import { ComponentProps } from "react";

import { BUTTON_TYPE } from "../../constants/keys";

interface PropsType extends Omit<ComponentProps<"button">, "type"> {
  type?: "fill" | "outlined";
  rounded?: "small" | "large";
  isError?: boolean;
  color?: string;
  onClick: () => void;
}

export function Button({
  children,
  type = BUTTON_TYPE.fill,
  rounded = "small",
  isError = false,
  color,
  onClick,
  ...rest
}: PropsType) {
  const bgColorName = type === BUTTON_TYPE.outlined ? "" : "bg-blue";
  const textColorName = isError
    ? "text-red"
    : type === BUTTON_TYPE.outlined
    ? "text-blue"
    : "text-white";
  const borderColorName = isError
    ? "border-red"
    : type === BUTTON_TYPE.outlined
    ? "border-blue"
    : "";
  const border = type === BUTTON_TYPE.outlined ? "border" : "";
  const borderRadius = rounded === "small" ? "rounded-lg" : "rounded-full";

  return (
    <button
      className={`${color} ${!color && bgColorName} ${
        !color && textColorName
      } ${border} ${
        !color && borderColorName
      } ${borderRadius} h-full py-[15px] font-semibold w-full flex items-center justify-center disabled:bg-gray-002 disabled:text-white disabled:border-gray-002 disabled:cursor-not-allowed`}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
