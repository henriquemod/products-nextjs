import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  if (cookieStore.get("access-token")) {
    cookieStore.delete("access-token");
  }

  return new Response(null, {
    status: 204,
  });
}
