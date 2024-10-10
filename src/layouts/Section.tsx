import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

export function Section(props: PropsType) {
  const { children } = props;

  return (
    <section className="bg-white p-4 rounded-2xl md:py-9 md:px-[60px] shadow-base w-full max-w-[62rem]">
      {children}
    </section>
  );
}
