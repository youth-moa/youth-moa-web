import { ComponentPropsWithoutRef } from "react";

interface PropsType extends ComponentPropsWithoutRef<"input"> {}

export function DatePicker({ ...rest }: PropsType) {
  return (
    <input
      type="date"
      className="w-full border rounded-[10px] border-border-gray px-4 py-3"
      {...rest}
    />
  );
}
