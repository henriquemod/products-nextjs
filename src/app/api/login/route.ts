import { envs } from "@/envs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const requestBackend = async (username: string, password: string) => {
  const response = await fetch(`${envs.apiEndpoint}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return response;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = await requestBackend(body.username, body.password);
  const jsonData = await data.json();

  if (data.status === 200) {
    const cookieStore = cookies();
    cookieStore.set("acess-token", jsonData.access_token);
  }

  return NextResponse.json(jsonData, { status: data.status });
}
