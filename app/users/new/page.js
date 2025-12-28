// app/users/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // برای ریدایرکت پس از موفقیت

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }), // ارسال داده‌ها به بک‌اند
      });

      if (!response.ok) {
        // اگر سرور پاسخ موفقیت‌آمیز نداد (مثلاً 400 یا 500)
        const errorData = await response.json();
        throw new Error(errorData.error || `خطای سرور: ${response.status}`);
      }

      // 💡 در صورت موفقیت
      alert("کاربر با موفقیت ایجاد شد!");
      router.push("/users"); // انتقال به صفحه لیست کاربران
    } catch (err) {
      console.error("خطا در ایجاد کاربر:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        ایجاد کاربر جدید
      </h1>

      {/* پیام خطا */}
      {error && (
        <div
          className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            نام
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
              درحال ارسال...
            </span>
          ) : (
            "ذخیره کاربر"
          )}
        </button>
      </form>
    </div>
  );
}
