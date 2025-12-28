// app/api/products/route.js

// مدیریت درخواست GET: واکشی لیست محصولات
export async function GET(request) {
  // این منطق سمت سرور اجرا می‌شود
  const products = await db.getProducts();

  return Response.json({ products });
}

// مدیریت درخواست POST: افزودن محصول جدید
export async function POST(request) {
  const productData = await request.json();
  const newProduct = await db.createProduct(productData);

  return Response.json({ newProduct }, { status: 201 });
}
