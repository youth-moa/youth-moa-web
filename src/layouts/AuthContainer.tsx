import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}
export default function AuthContainer({ children }: PropsType) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-5 py-12">
      {children}
    </div>
  );
}
