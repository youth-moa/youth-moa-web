import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

export function InputContainer({ children }: PropsType) {
  return <div className="w-full md:col-span-2">{children}</div>;
}
