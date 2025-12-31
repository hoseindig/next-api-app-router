"use client";

import { fetchData } from "@/lib/fetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { product } from "@/types";
import GenericTable from "@/components/GenricTable";

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
      <GenericTable
        items={products}
        getKey={(item) => item._id}
        renderRow={(item) => (
          <>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
          </>
        )}
      />
    </div>
  );
};

export default ProductsPage;
