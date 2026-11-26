import Image from "next/image";
import type { Album } from "@/lib/album";

/** Album sleeve with the vinyl peeking out on the right. */
export function RecordCover({
  album,
  sizes,
  priority,
}: {
  album: Album;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="group relative aspect-square w-full">
      <div className="absolute inset-y-[4%] right-0 aspect-square h-[92%] rounded-full bg-[repeating-radial-gradient(circle,#111_0_2px,#222_2px_4px)] shadow-lg ring-1 ring-white/15 transition-transform duration-500 group-hover:translate-x-[12%]">
        <div className="absolute inset-[34%] overflow-hidden rounded-full">
          <Image src={album.cover} alt="" fill sizes="80px" className="object-cover" />
        </div>
      </div>
      <div className="relative aspect-square w-[88%] overflow-hidden rounded-sm bg-foreground/10 shadow-xl">
        <Image
          src={album.cover}
          alt={`${album.title} by ${album.artist}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
