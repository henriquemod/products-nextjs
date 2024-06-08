import { Header } from "@/components/header";
import { Table } from "@/components/table";
import { Product } from "@/domain/product";
import { cookies } from "next/headers";

export async function getProducts(): Promise<Product[] | undefined> {
  try {
    const res = await fetch(`http://localhost:3000/api/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const products = await getProducts();
  const cookieStore = cookies();
  return (
    <main>
      <Header />
      <div className="flex flex-col gap-6 px-6 max-w-6xl ml-auto mr-auto">
        <h1>Products Available</h1>
        <Table products={products || []} />
      </div>
    </main>
  );
}
