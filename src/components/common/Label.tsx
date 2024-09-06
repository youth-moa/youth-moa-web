import { ComponentProps } from "react";

interface PropsType extends ComponentProps<"span"> {
  label: string;
  required?: boolean;
}

export function Label({ label, required = false, className }: PropsType) {
  return (
    <span
      className={`${
        required && "after:content-['*'] after:text-red after:ml-1"
      } ${className}`}
    >
      {label}
    </span>
  );
}
