"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type PropsLink = LinkProps & {
  children: React.ReactNode;
};

export function ActiveLink({ href, children, ...rest }: PropsLink) {
  const pathname = usePathname();
  const isActive = pathname === href.toString();
  return (
    <Link
      href={href}
      className={`hover:opacity-35 transition flex items-center ${
        isActive ? "opacity-35" : "opacity-100"
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
}
