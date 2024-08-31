export function IconLabel({
  label,
  activate = true,
}: {
  label: string;
  activate?: boolean;
}) {
  return (
    <span
      className={`absolute w-max text-xs font-semibold -bottom-6 ${
        activate ? "text-blue" : "text-gray-003"
      }`}
    >
      {label}
    </span>
  );
}
