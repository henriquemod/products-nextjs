import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { Label } from "../ui/label";
import { SignOut } from "./sign-out";

export const Header: React.FC = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("acess-token");
  return (
    <div className="bg-gray-800 flex content-center justify-center text-white">
      <div className="flex flex-1 justify-between p-5 max-w-4xl">
        <Label className="text-lg">Products Manager</Label>
        {token ? (
          <SignOut />
        ) : (
          <Link className="leading-normal" href="/auth">
            SignIn
          </Link>
        )}
      </div>
    </div>
  );
};
