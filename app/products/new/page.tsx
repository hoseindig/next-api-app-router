"use client";

import InputItem from "@/components/InputItem";
import { fetchData } from "@/lib/fetchData";
import { useState } from "react";
import { useRouter } from "next/navigation"; // برای ریدایرکت پس از موفقیت
import ActionButton from "@/components/Button";
import { product } from "@/types";

const AddNewProduct = () => {
  const [prouct, setproduct] = useState<product>({
    name: "",
    price: 0,
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const sendData = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prouct), // ارسال داده‌ها به بک‌اند
      });

      if (!response.ok) {
        // اگر سرور پاسخ موفقیت‌آمیز نداد (مثلاً 400 یا 500)
        const errorData = await response.json();
        throw new Error(errorData.error || `خطای سرور: ${response.status}`);
      }

      // 💡 در صورت موفقیت
      alert("کاربر با موفقیت ایجاد شد!");
      router.push("/products"); // انتقال به صفحه لیست کاربران
    } catch (err) {
      console.error("خطا در ایجاد کاربر:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1>Add New Product</h1>
      {/* {prouct.name}
      {prouct.price}
      {prouct.description} */}
      <InputItem
        value={prouct}
        seter={setproduct}
        name="name"
        placeholder="Name"
      />

      <InputItem
        value={prouct}
        seter={setproduct}
        name="price"
        placeholder="Price"
        type="number"
      />

      <InputItem
        value={prouct}
        seter={setproduct}
        name="description"
        placeholder="Description"
      />

      <ActionButton
        label="ذخیره محصول"
        isLoading={isLoading}
        handleClick={sendData}
      />
    </>
  );
};

export default AddNewProduct;
