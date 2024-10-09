// import { IcoStarFilled, IcoStarOutlined } from "../../assets";
import { dateFormat } from "../../utils";
import { StatusBadge } from "./StatusBadge";

interface PropsType {
  programName: string;
  programStartDate: string;
  programEndDate: string;
  programImageUrl: string;
  status: "progress" | "closed";
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
      className={`flex flex-col gap-3 w-[12rem] ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={programImageUrl}
        className="h-[11.5rem] object-cover rounded-lg"
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
        <h4 className="overflow-hidden text-base text-header-black whitespace-nowrap text-ellipsis">
          {programName}
        </h4>
        <p className="text-sm text-gray-000">
          {dateFormat(programStartDate)} ~ {dateFormat(programEndDate)}
        </p>
      </div>
    </section>
  );
}
