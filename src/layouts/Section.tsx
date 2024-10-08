import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

export function Section(props: PropsType) {
  const { children } = props;

  return (
    <section className="bg-white rounded-2xl py-9 px-[60px] shadow-base w-full max-w-[50rem]">
      {children}
    </section>
  );
}
