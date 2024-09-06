interface PropsType {
  text: string;
}

export function SubTitle({ text }: PropsType) {
  return <h1 className="text-3xl font-bold">{text}</h1>;
}
