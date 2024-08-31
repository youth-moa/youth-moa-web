import { ReactNode } from "react";

export function IconContainer({ children }: { children: ReactNode }) {
  return (
    <span className="relative flex flex-col items-center">{children}</span>
  );
}
