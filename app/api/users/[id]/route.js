// app/api/users/[id]/route.js
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ---------------------------
// 🗑️ DELETE: /api/users/[id]
// ---------------------------
export async function DELETE(request, { params }) {
  // 💡 تغییر: پارامترها باید با await خوانده شوند.
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Console.log قبلی شما نشان داد که id در داخل شیء Resolve شده است.
  // console.log("Received params:", resolvedParams);

  if (!id) {
    return new Response(JSON.stringify({ error: "User ID is missing" }), {
      status: 400,
    });
  }

  try {
    // ... بقیه منطق دیتابیس بدون تغییر
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
    // ...
    return new Response(
      JSON.stringify({ error: "Failed to delete user or invalid ID format" }),
      { status: 500 }
    );
  }
}
