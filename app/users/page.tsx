"use client";

import GenericTable from "@/components/GenricTable";
import Loading from "@/components/Loading";
import { fetchData } from "@/lib/fetchData";
import { UserType } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchDataFn() {
      setLoading(true);
      const res = await fetchData<UserType[]>("/api/users"); //await fetch("/api/users");
      setLoading(false);

      console.log(res);
      setUsers(res);
    }

    fetchDataFn();
  }, []);

  const deleteUser = async (id: string) => {
    setLoading(true);

    // 1. ارسال درخواست DELETE به Route Handler داینامیک
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      // 2. موفقیت (204 No Content): حذف از لیست بدون نیاز به خواندن Body
      setUsers(users.filter((user) => user._id !== id));
      console.log(`کاربر با ID: ${id} با موفقیت حذف شد.`);
    } else if (res.ok) {
      // 3. اگر کد وضعیت موفقیت آمیز دیگری (مثل 200 OK) برگشته باشد
      // (اگر Route Handler شما 204 برنگردانده بود):
      const data = await res.json();
      console.log("پاسخ حذف:", data);
      setUsers(users.filter((user) => user._id !== id)); // یا بر اساس نیاز
    } else {
      // 4. شکست (مثلاً 404 Not Found یا 500 Internal Server Error)
      let errorMsg = "خطای ناشناخته در حذف";
      try {
        const errorData = await res.json();
        errorMsg = errorData.error || errorMsg;
      } catch (e) {
        // اگر سرور هیچ JSONی هم برنگرداند، خطای پیش فرض را نشان بده
      }
      console.error(`خطا در حذف کاربر: ${res.status}`, errorMsg);
      alert(`حذف شکست خورد: ${errorMsg}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    // const debouncedValue = useDebounce(searchTerm, 500);
    const handler = setTimeout(() => {
      console.log("Searching for:", searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <>
      <h1 className="text-center text-3xl">Users</h1>
      <Link href="/users/new" passHref>
        new user
      </Link>

      <input
        placeholder="Search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? <Loading /> : null}

      <GenericTable<UserType>
        items={users}
        getKey={(item) => item._id}
        headers={["Id", "Name", "Email"]}
        renderRow={(item) => (
          <>
            <th>{item._id}</th>
            <th>{item.name}</th>
            <th>{item.email}</th>
          </>
        )}
      />
    </>
  );
};

export default UsersPage;
