import { notFound } from "next/navigation";

// تعریف Type برای Props ارسالی از Next.js
interface UserDetailProps {
  params: {
    id: string; // ID کاربر را از مسیر /users/ID دریافت می‌کند
  };
}

// تعریف Type برای داده‌های کاربر
interface IUser {
  _id: string;
  name: string;
  email: string;
  // هر فیلد دیگری که از MongoDB می‌آید
}

// 1. تابع واکشی داده (Server-Side Data Fetching)
async function fetchUser(id: string): Promise<IUser | null> {
  console.log("fetchUser", id);

  // آدرس API Handler که قبلاً در /api/users/[id]/route.js ساختیم
  const apiUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/api/users/${id}`;

  try {
    const res = await fetch(apiUrl, {
      // 💡 بهترین روش برای واکشی داده‌های داینامیک
      cache: "no-store", // تضمین می‌کند که داده‌ها هنگام درخواست جدیداً واکشی شوند
    });

    if (res.status === 404) {
      return null; // کاربر پیدا نشد
    }

    if (!res.ok) {
      // خطاهای سرور دیگر (500)
      throw new Error(`Failed to fetch user. Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    // در محیط Production، می‌توانید خطای 500 را برگردانید
    throw new Error("An unexpected error occurred while fetching data.");
  }
}

// 2. کامپوننت صفحه (Server Component)
export default async function UserDetailPage({ params }: UserDetailProps) {
  console.log("UserDetailPage params", params);

  const resolvedParams = await params;

  // 💡 اکنون از resolvedParams.id استفاده می‌کنیم که مقدار string صحیح را دارد.
  const user = await fetchUser(resolvedParams.id);
  // واکشی داده‌ها با استفاده از ID دریافت شده از URL

  // اگر کاربر پیدا نشد، به صفحه 404 هدایت کن (Next.js Built-in)
  if (!user) {
    notFound();
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-xl rounded-xl">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700 border-b pb-2">
        جزئیات کاربر: {user.name}
      </h1>

      <div className="space-y-4 text-lg">
        <p className="flex justify-between items-center border-b pb-2">
          <strong className="text-gray-600">ID (MongoDB):</strong>
          <span className="font-mono text-sm bg-gray-100 p-1 rounded">
            {user._id}
          </span>
        </p>
        <p className="flex justify-between items-center border-b pb-2">
          <strong className="text-gray-600">نام کامل:</strong>
          <span className="text-gray-800">{user.name}</span>
        </p>
        <p className="flex justify-between items-center">
          <strong className="text-gray-600">آدرس ایمیل:</strong>
          <span className="text-gray-800">{user.email}</span>
        </p>
      </div>

      {/* می‌توانید دکمه‌های Edit یا Delete را اینجا اضافه کنید */}
      <div className="mt-8 text-center">
        <a
          href="/users"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600"
        >
          بازگشت به لیست
        </a>
      </div>
    </div>
  );
}
