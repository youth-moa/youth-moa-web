import { ComponentPropsWithoutRef } from "react";

interface PropsType extends ComponentPropsWithoutRef<"input"> {
  helpText?: string;
}

export function DatePicker(props: PropsType) {
  const { helpText, ...rest } = props;
  return (
    <div className="relative">
      <input
        type="date"
        className={`w-full border rounded-[10px] border-border-gray px-4 py-3 ${
          helpText ? "border-red" : "border-border-gray"
        }`}
        {...rest}
      />

      {helpText && (
        <p className={`absolute text-red text-xs ml-4 mt-1/2 w-max`}>
          {helpText}
        </p>
      )}
    </div>
  );
}
