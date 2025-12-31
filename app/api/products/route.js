// app/api/products/route.js
import { connectToDatabase } from "@/lib/mongodb"; // فرض می‌کنیم از @/lib/mongodb استفاده می‌کنید

// مدیریت درخواست GET: واکشی لیست محصولات
// export async function GET(request) {
//   // این منطق سمت سرور اجرا می‌شود
//   const products = await db.getProducts();

//   return Response.json({ products });
// }

// ---------------------------
// 📚 GET (Read All): /api/products
// ---------------------------
export async function GET() {
  try {
    console.log("GET productData");

    const { db } = await connectToDatabase();
    const collection = db.collection("products"); // نام کالکشن

    // واکشی تمام  products
    const products = await collection.find({}).toArray();

    console.log("GET product Data", products);

    return Response.json(products);
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

// ---------------------------
// ➕ POST (Create): /api/products
// ---------------------------
export async function POST(request) {
  try {
    console.log("POST productData");

    const { db } = await connectToDatabase();
    const collection = db.collection("products");

    const productData = await request.json();
    console.log("POST productData:", productData);

    // افزودن تاریخ ایجاد و ID توسط MongoDB
    const result = await collection.insertOne(productData);

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

// // مدیریت درخواست POST: افزودن محصول جدید
// export async function POST(request) {
//   const productData = await request.json();
//   const newProduct = await db.createProduct(productData);

//   return Response.json({ newProduct }, { status: 201 });
// }
