import { ReactNode } from "react";

export function Section(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <section className="bg-white px-8 py-11 rounded-2xl  shadow-base w-full max-w-[62rem]">
      {children}
    </section>
  );
}
