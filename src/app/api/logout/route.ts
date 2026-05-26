import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  if (cookieStore.get(ACCESS_TOKEN_COOKIE)) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
  }

  return new Response(null, {
    status: 204,
  });
}
