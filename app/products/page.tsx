"use client";

import { fetchData } from "@/lib/fetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { product } from "@/types";

const ProductsPage = () => {
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const res = await fetchData<product[]>("/api/products");
      setProducts(res);
      console.log(res);
    }
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products Page</h1>
      <Link href="/products/new">Add New Product</Link>

      <hr />

      <table className="full w-full border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-950 text-white">
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="odd:bg-gray-100 even:bg-white">
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
