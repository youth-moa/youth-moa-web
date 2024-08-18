import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

export function List({ children }: PropsType) {
  return (
    <li className="w-full flex flex-col gap-2 md:grid md:grid-cols-4 md:h-[46px] md:items-center justify-center items-start">
      {children}
    </li>
  );
}
