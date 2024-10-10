interface PropsType {
  status: string;
}

export function StatusBadge(props: PropsType) {
  const { status } = props;

  return (
    <span
      className={`w-fit h-fit text-white rounded-[20px] text-xs font-semibold py-[2px] px-2 ${
        status === "진행중" ? "bg-green" : "bg-gray-001"
      }`}
    >
      {status}
    </span>
  );
}
