interface PropsType {
  space: number;
}

export default function Spacing({space}: PropsType) {
  return <div className={`my-${space}`} />
}