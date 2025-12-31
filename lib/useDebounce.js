import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // ایجاد تایمر برای بروزرسانی مقدار بعد از تاخیر مشخص شده
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // پاکسازی تایمر در صورتی که مقدار (value) قبل از پایان زمان تغییر کند
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
