import { IcoPrev } from "../../assets";

interface PropsType {
  onClick: () => void;
  className?: string;
}

export function PrevButton(props: PropsType) {
  const { onClick, className } = props;

  return (
    <button
      className={`absolute flex items-center justify-center bg-white rounded-full shadow-md w-11 h-11 z-50 ${className}`}
      onClick={onClick}
    >
      <IcoPrev fill="rgba(110, 112, 116, 1)" className="w-3 h-4" />
    </button>
  );
}
