// app/dashboard/actions.js
"use server"; // 💡 این دایرکتیو آن را به یک تابع سمت سرور تبدیل می‌کند

export async function saveProduct(formData) {
  const name = formData.get("name");
  // منطق بک‌اند (مثل ذخیره در دیتابیس)
  await db.save({ name });

  // می‌توانید از revalidatePath برای به‌روزرسانی UI استفاده کنید
  // revalidatePath('/dashboard');
}
