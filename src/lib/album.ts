import mongoose, { type InferSchemaType } from "mongoose";

const albumSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  label: String,
  /** Total running time in seconds. */
  duration: Number,
  /** Path under /public, e.g. /covers/abbey-road.jpg */
  cover: { type: String, required: true },
  tracks: [String],
});

export type Album = InferSchemaType<typeof albumSchema>;

export const AlbumModel =
  (mongoose.models.Album as mongoose.Model<Album>) ??
  mongoose.model("Album", albumSchema);
