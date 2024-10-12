export function SubTitle(props: { text: string }) {
  const { text } = props;

  return <h2 className="text-xl font-semibold">{text}</h2>;
}
