import { PROGRAM_STATUS } from "../../constants/keys";

interface PropsType {
  status: "progress" | "closed";
}

export function StatusBadge(props: PropsType) {
  const { status } = props;

  return (
    <span
      className={`w-fit h-fit text-white rounded-[20px] text-xs font-semibold py-[2px] px-2 ${
        status === "progress" ? "bg-green" : "bg-gray-001"
      }`}
    >
      {PROGRAM_STATUS[status]}
    </span>
  );
}
