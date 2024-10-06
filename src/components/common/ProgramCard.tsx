// import { IcoStarFilled, IcoStarOutlined } from "../../assets";
import { StatusBadge } from "./StatusBadge";

interface PropsType {
  programName: string;
  programStartDate: string;
  programEndDate: string;
  programImageUrl: string;
  status?: "진행중" | "마감";
  isLiked?: boolean;
  onClick?: () => void;
}

export function ProgramCard(props: PropsType) {
  const {
    programName,
    programStartDate,
    programEndDate,
    programImageUrl,
    status,
    // isLiked,
    onClick,
  } = props;
  return (
    <section
      className={`flex flex-col gap-3 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <img
        src={programImageUrl}
        className="h-[184px] object-cover rounded-lg"
      />

      <div className="flex flex-col gap-1">
        {status && (
          <div className="flex items-center justify-between">
            <StatusBadge status={status} />
            {/* TODO: 즐겨찾기 고도화 */}
            {/* {isLiked ? (
              <button>
                <IcoStarFilled />
              </button>
            ) : (
              <button>
                <IcoStarOutlined />
              </button>
            )} */}
          </div>
        )}
        <h4 className="text-base text-header-black">{programName}</h4>
        <p className="text-sm text-gray-000">
          {programStartDate} ~ {programEndDate}
        </p>
      </div>
    </section>
  );
}
