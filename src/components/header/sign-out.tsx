"use client";
import React from "react";
import Link from "next/link";
import { useUserStore } from "@/providers/user-provider";
import { useRouter } from "next/navigation";

export const SignOut: React.FC = () => {
  const { clearAccessToken } = useUserStore((state) => state);
  const router = useRouter();
  const handleSignOut = async (
    e: React.MouseEvent<HTMLAnchorElement> | undefined
  ) => {
    e?.preventDefault();
    const res = await clearAccessToken();
    if (res.type === "OK") {
      router.push("/auth");
    }
  };
  return (
    <Link
      className="leading-normal cursor-pointer"
      href="#"
      onClick={handleSignOut}
    >
      SignOut
    </Link>
  );
};
