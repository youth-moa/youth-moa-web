interface PropsType {}

export function DatePicker({}: PropsType) {
  return (
    <input
      type="date"
      className="w-full border rounded-[10px] border-border-gray px-4 py-3"
    />
  );
}
