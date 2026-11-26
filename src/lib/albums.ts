import { cacheLife } from "next/cache";
import { AlbumModel, type Album } from "./album";
import { connectDb } from "./db";

// Plain objects only: cached results must be serializable (no ObjectIds).
const projection = { _id: 0, __v: 0 } as const;

export async function getAlbums(): Promise<Album[]> {
  "use cache";
  cacheLife("hours");
  await connectDb();
  return AlbumModel.find({}, projection).sort({ artist: 1, year: 1 }).lean();
}

export async function getAlbum(slug: string): Promise<Album | null> {
  "use cache";
  cacheLife("hours");
  await connectDb();
  return AlbumModel.findOne({ slug }, projection).lean();
}
