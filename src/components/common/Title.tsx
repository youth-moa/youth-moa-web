interface PropsType {
  title: string;
}

export function Title({ title }: PropsType) {
  return <h1 className="text-2xl font-semibold">{title}</h1>;
}
