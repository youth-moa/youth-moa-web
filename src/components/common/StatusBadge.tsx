import { PROGRAM_STATUS } from "../../constants/keys";

interface PropsType {
  status:
    | "progress"
    | "closed"
    | "pending"
    | "approved"
    | "rejected"
    | "canceled";
  padding?: string;
}

export function StatusBadge(props: PropsType) {
  const { status, padding } = props;

  const getColor = ({ status }: Pick<PropsType, "status">) => {
    switch (status) {
      case "progress":
        return "bg-badge-progress";
      case "closed":
        return "bg-badge-closed";
      case "pending":
        return "bg-badge-pending";
      case "approved":
        return "bg-badge-approved";
      case "rejected":
        return "bg-badge-rejected";
      case "canceled":
        return "bg-badge-canceled";
      default:
        return "";
    }
  };

  return (
    <span
      className={`w-fit h-fit text-white rounded-[20px] text-[10px] md:text-xs font-bold py-[2px] ${
        padding ?? "px-2"
      } ${getColor({ status })}`}
    >
      {PROGRAM_STATUS[status]}
    </span>
  );
}
