interface PropsType {
  title: string;
  startAt: string;
  endAt: string;
  thumbnail: string;
}

export function ProgramCard({ title, startAt, endAt, thumbnail }: PropsType) {
  return (
    <section className="flex flex-col gap-3">
      <img src={thumbnail} className="h-[184px] object-cover rounded-lg" />

      <div className="flex flex-col gap-1">
        <h4 className="text-base text-header-black">{title}</h4>
        <p className="text-sm text-gray-000">
          {startAt} ~ {endAt}
        </p>
      </div>
    </section>
  );
}
