import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ---------------------------
// 📚 GET (Read Single): /api/users/[id]
// ---------------------------
export async function GET(request, { params }) {
  // 💡 Resolve کردن پارامترها (بر اساس خطای قبلی که با هم حل کردیم)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) {
    return new Response(JSON.stringify({ error: "User ID is missing" }), {
      status: 400,
    });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    // واکشی کاربر بر اساس _id (تبدیل string به ObjectId ضروری است)
    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return Response.json(user); // بازگرداندن شیء کاربر
  } catch (error) {
    console.error("GET Single User Error:", error);
    // این خطا می‌تواند به دلیل فرمت نادرست ObjectId هم باشد
    return new Response(
      JSON.stringify({ error: "Failed to fetch user or invalid ID format" }),
      { status: 500 }
    );
  }
}

// ---------------------------
// 🗑️ DELETE (Delete) - (متدی که قبلاً نوشتیم)
// ---------------------------
export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  // ... بقیه منطق DELETE
  if (!id) {
    return new Response(JSON.stringify({ error: "User ID is missing" }), {
      status: 400,
    });
  }

  try {
    // ...
    const { db } = await connectToDatabase();
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete user or invalid ID format" }),
      { status: 500 }
    );
  }
}
