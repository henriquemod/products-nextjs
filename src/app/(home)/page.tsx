import { Header } from "@/components/header";
import { ProductTable } from "@/components/product-table";
import { Product } from "@/domain/product";

export async function getProducts(): Promise<Product[] | undefined> {
  try {
    const res = await fetch(`http://localhost:3030/products`, {
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

  return (
    <main>
      <Header />
      <div className="flex flex-col gap-6 px-6 max-w-4xl ml-auto mr-auto">
        <h1>Products Available</h1>
        <ProductTable products={products} />
      </div>
    </main>
  );
}
