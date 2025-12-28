"use client";

import Loading from "@/components/Loading";
import { userType } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" passHref>
        new user
      </Link>
      {loading ? <Loading /> : null}
      <table className="w-full text-center border border-gray-300  ">
        <thead className="bg-gray-950 text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id} className=" odd:bg-gray-100 even:bg-white ">
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
