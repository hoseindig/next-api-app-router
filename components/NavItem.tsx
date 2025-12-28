// components/NavItem.tsx (مثال)
import Link from "next/link";
import React from "react";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  return (
    // کلاس تکراری فقط در اینجا قرار می‌گیرد و مرکزی می‌شود
    <li className="hover:text-blue-700">
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default NavItem;
