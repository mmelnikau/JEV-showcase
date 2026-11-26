import type { Vinyl } from "@/data/records";

/** A record sleeve drawn with CSS, with the vinyl peeking out on the right. */
export function RecordCover({ record }: { record: Vinyl }) {
  const [dark, light] = record.colors;

  return (
    <div className="group relative aspect-square w-full">
      <div className="absolute inset-y-[4%] right-0 aspect-square h-[92%] rounded-full bg-[repeating-radial-gradient(circle,#111_0_2px,#222_2px_4px)] shadow-lg transition-transform duration-500 group-hover:translate-x-[12%]">
        <div
          className="absolute inset-[34%] rounded-full"
          style={{ background: light }}
        />
      </div>
      <div
        className="relative flex aspect-square w-[88%] flex-col justify-end rounded-sm p-4 shadow-xl"
        style={{ background: `linear-gradient(135deg, ${dark}, ${light})` }}
      >
        <p className="text-lg font-bold leading-tight text-white drop-shadow">
          {record.title}
        </p>
        <p className="text-sm text-white/80 drop-shadow">{record.artist}</p>
      </div>
    </div>
  );
}
