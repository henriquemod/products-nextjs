"use client";
import React from "react";
import { Label } from "../ui/label";
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
    <Link href="#" onClick={handleSignOut}>
      <Label className="leading-normal cursor-pointer">SignOut</Label>
    </Link>
  );
};
