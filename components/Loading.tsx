const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="
      w-12 h-12          /* اندازه دایره */
      rounded-full       /* دایره کامل */
      border-4           /* ضخامت خط */
      border-gray-300    /* رنگ اصلی خط (خاکستری روشن) */
      border-t-indigo-600 /* رنگ خط متحرک (آبی تیره) */
      animate-spin       /* اعمال انیمیشن چرخشی از Tailwind */
    "
      ></div>
    </div>
  );
};

export default Loading;
