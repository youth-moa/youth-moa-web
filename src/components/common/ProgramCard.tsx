import { Button } from "./Button";

interface PropsType {
  title: string;
  startAt: string;
  endAt: string;
  thumbnail: string;
  status?: "진행중" | "마감";
  isLiked?: boolean;
  onClick?: () => void;
}

export function ProgramCard(props: PropsType) {
  const { title, startAt, endAt, thumbnail, status, isLiked, onClick } = props;
  return (
    <section className="flex flex-col gap-3">
      <img src={thumbnail} className="h-[184px] object-cover rounded-lg" />

      <div className="flex flex-col gap-1">
        {status && (
          <div className="flex items-center justify-between">
            <span>{status}</span>
            {isLiked ? "★" : "☆"}
          </div>
        )}
        <h4 className="text-base text-header-black">{title}</h4>
        <p className="text-sm text-gray-000">
          {startAt} ~ {endAt}
        </p>
      </div>

      {onClick && (
        <div className="h-10">
          <Button onClick={onClick} disabled={status === "마감"}>
            신청하기
          </Button>
        </div>
      )}
    </section>
  );
}
