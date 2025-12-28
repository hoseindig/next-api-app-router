"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log("%c Mount ", "background:green;color:white");

    const timer = setInterval(() => {
      setCounter((pre) => pre + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log("%c UnMount ", "background:red;color:white");
    };
  }, []);

  return (
    <div>
      <h1>count : {count}</h1>
    </div>
  );
}
