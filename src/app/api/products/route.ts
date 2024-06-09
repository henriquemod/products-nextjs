import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL as string;

if (!API_URL) {
  throw new Error("API_URL environment variable is not set");
}

const getAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("acess-token")?.value;
};

const createHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

const handleResponse = async (res: Response) => {
  if (res.status === 204) {
    return new Response(null, {
      status: 204,
    });
  }
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
};

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const token = getAuthToken();

  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: createHeaders(token),
    body: JSON.stringify(requestBody),
  });

  return handleResponse(res);
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const requestBody = await request.json();
  const token = getAuthToken();

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: createHeaders(token),
    body: JSON.stringify(requestBody),
  });

  return handleResponse(res);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const endpoint = id ? `products/id=${id}` : "products";

  const res = await fetch(`${API_URL}/${endpoint}`, {
    headers: createHeaders(),
  });

  return handleResponse(res);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const token = getAuthToken();

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: createHeaders(token),
  });

  return handleResponse(res);
}
