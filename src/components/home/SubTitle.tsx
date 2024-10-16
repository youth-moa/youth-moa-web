interface PropsType {
  text: string;
  className?: string;
}

export function SubTitle(props: PropsType) {
  const { text, className } = props;

  return <h1 className={`text-3xl font-semibold ${className}`}>{text}</h1>;
}
