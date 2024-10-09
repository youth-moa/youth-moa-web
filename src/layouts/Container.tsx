import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
  hasBgColor?: boolean;
}
export default function Container(props: PropsType) {
  const { children, hasBgColor } = props;

  return (
    <div
      className={`flex flex-col items-center justify-center h-full px-5 py-12 ${
        hasBgColor ? "bg-gray-005" : ""
      }`}
    >
      {children}
    </div>
  );
}
