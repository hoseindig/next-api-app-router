// app/api/users/route.js
// URL Endpoint: /api/users

let mockUsers = [
  { id: 1, name: "علی احمدی", email: "ali@example.com" },
  { id: 2, name: "سارا حسینی", email: "sara@example.com" },
  { id: 3, name: "رضا محمدی", email: "reza@example.com" },
];
let nextId = 4; // برای تخصیص IDهای جدید

// ---------------------------
// 📚 GET (Read All): /api/users
// ---------------------------
export async function GET() {
  console.log("درخواست GET: بازگرداندن همه کاربران");

  // شبیه‌سازی تأخیر دیتابیس
  // await new Promise(resolve => setTimeout(resolve, 500));

  return Response.json(mockUsers);
}

// ---------------------------
// ➕ POST (Create): /api/users
// ---------------------------
export async function POST(request) {
  const newUser = await request.json();

  // تخصیص ID و اضافه کردن به لیست
  newUser.id = nextId++;
  mockUsers.push(newUser);

  console.log("درخواست POST: کاربر جدید ایجاد شد:", newUser);

  return Response.json(newUser, { status: 201 }); // 201 Created
}

// ---------------------------
// 🔄 PUT (Update): /api/users
// *توجه: در Next.js برای سادگی، PUT روی همان endpoint اصلی پیاده می‌شود.
// در پروژه‌های واقعی، بهتر است از route داینامیک استفاده شود (مثلاً /api/users/[id]).
// ---------------------------
export async function PUT(request) {
  const updatedUser = await request.json();
  const index = mockUsers.findIndex((u) => u.id === updatedUser.id);

  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...updatedUser };
    console.log("درخواست PUT: کاربر به‌روزرسانی شد:", mockUsers[index]);
    return Response.json(mockUsers[index]);
  } else {
    return new Response(JSON.stringify({ error: "کاربر پیدا نشد." }), {
      status: 404,
    });
  }
}

// ---------------------------
// 🗑️ DELETE (Delete): /api/users
// *توجه: ID کاربری که قرار است حذف شود باید در بدنه درخواست (body) ارسال شود.
// ---------------------------
export async function DELETE(request) {
  const { id } = await request.json();
  const initialLength = mockUsers.length;

  mockUsers = mockUsers.filter((u) => u.id !== id);

  if (mockUsers.length < initialLength) {
    console.log(`درخواست DELETE: کاربر با ID ${id} حذف شد.`);
    return new Response(null, { status: 204 }); // 204 No Content
  } else {
    return new Response(JSON.stringify({ error: "کاربر پیدا نشد." }), {
      status: 404,
    });
  }
}
