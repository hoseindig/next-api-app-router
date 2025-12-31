"use client";

import { fetchData } from "@/lib/fetchData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import GenericTable from "@/components/GenricTable";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const res = await fetchData<Product[]>("/api/products");
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
      <GenericTable<Product>
        items={products}
        getKey={(item) => item._id}
        headers={["Id", "Name", "Price", "Description"]}
        renderRow={(item) => (
          <>
            <th>{item._id}</th>
            <th>{item.name}</th>
            <th>{item.price}</th>
            <th>{item.description}</th>
          </>
        )}
      />
    </div>
  );
};

export default ProductsPage;
