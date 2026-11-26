import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://localhost:27017/groove-shelf";

// Reuse one connection across hot reloads in dev.
const globalForMongoose = globalThis as unknown as {
  mongoose?: Promise<typeof mongoose>;
};

export function connectDb() {
  globalForMongoose.mongoose ??= mongoose.connect(MONGODB_URI);
  return globalForMongoose.mongoose;
}
