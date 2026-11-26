/**
 * Replaces the albums collection with db/catalog.json.
 *
 *   docker compose up -d
 *   npm run seed
 */
import mongoose from "mongoose";
import catalog from "./catalog.json";
import { AlbumModel } from "../src/lib/album";
import { connectDb } from "../src/lib/db";

async function main() {
  await connectDb();
  await AlbumModel.deleteMany({});
  await AlbumModel.syncIndexes();
  await AlbumModel.insertMany(catalog);
  console.log(`Seeded ${await AlbumModel.countDocuments()} albums.`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
