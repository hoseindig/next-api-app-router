// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

let cachedClient = null;
let cachedDb = null;

// تابع اصلی اتصال
export async function connectToDatabase() {
  console.log("Connecting to MongoDB...");

  if (cachedClient && cachedDb) {
    // استفاده از اتصال کش شده
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);

  try {
    // 1. اتصال به سرور
    await client.connect();
    console.log("MongoDB Connected.");

    // 2. انتخاب دیتابیس (اگر وجود نداشته باشد، MongoDB آن را ایجاد می‌کند)
    const db = client.db(dbName);

    // کش کردن اتصال برای استفاده‌های بعدی
    cachedClient = client;
    cachedDb = db;

    console.log("MongoDB Connected and ready.");

    return { client, db };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // اگر اتصال شکست خورد، کلاینت را ببندید
    client.close();
    throw error;
  }
}
