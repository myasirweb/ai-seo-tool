import mongoose, { type Connection } from "mongoose";

declare global {
  var mongoose: { conn: Connection | null; promise: Promise<Connection> | null } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export default async function connectDB(): Promise<Connection> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((m) => m.connection)
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
