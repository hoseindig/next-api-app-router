"use client";

import Loading from "@/components/Loading";
import { userType } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setLoading(false);

      console.log(data);
      setUsers(data);
    }

    fetchData();
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
      <table className="w-full text-center border border-gray-300  ">
        <thead className="bg-gray-950 text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id} className=" odd:bg-gray-100 even:bg-white ">
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className=" hover:cursor-pointer hover:text-red-800"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </span>
                <span className=" hover:cursor-pointer hover:text-blue-800 mx-4">
                  <Link href={`/users/${user._id}`}>View</Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
