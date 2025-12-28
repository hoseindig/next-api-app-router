// app/api/users/route.js
// URL Endpoint: /api/users
import { connectToDatabase } from "@/lib/mongodb"; // فرض می‌کنیم از @/lib/mongodb استفاده می‌کنید
import { ObjectId } from "mongodb"; // برای کار با IDهای MongoDB

// ---------------------------
// 📚 GET (Read All): /api/users
// ---------------------------
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users"); // نام کالکشن

    // واکشی تمام کاربران
    const users = await collection.find({}).toArray();

    return Response.json(users);
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

// ---------------------------
// ➕ POST (Create): /api/users
// ---------------------------
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    const userData = await request.json();

    // افزودن تاریخ ایجاد و ID توسط MongoDB
    const result = await collection.insertOne(userData);

    // بازگرداندن شیء ایجاد شده
    const newUser = await collection.findOne({ _id: result.insertedId });

    return Response.json(newUser, { status: 201 }); // 201 Created
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }
}

// ---------------------------
// 🔄 PUT (Update): /api/users
// ---------------------------
export async function PUT(request) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    const updatedUserData = await request.json();
    const { _id, ...updateFields } = updatedUserData; // فرض می‌کنیم _id در Body ارسال شده است

    // به‌روزرسانی بر اساس _id
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // واکشی کاربر به‌روزرسانی شده
    const updatedUser = await collection.findOne({ _id: new ObjectId(_id) });

    return Response.json(updatedUser);
  } catch (error) {
    console.error("PUT Error:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
    });
  }
}
