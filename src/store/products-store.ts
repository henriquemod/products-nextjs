import { Product } from "@/domain/product";
import { createStore } from "zustand/vanilla";

export type ProductsState = {
  products: Product[];
  productsPerPage: number;
  currentPage: number;
};

export type ProductsActions = {
  setProducts: (products: Product[]) => void;
  handleChangeProductsPerPage: (productsPerPage: number) => void;
  handleChangeCurrentPage: (currentPage: number) => void;
  handleDeleteProduct: (id: string) => Promise<void>;
  handleUpdateProduct: (
    productId: string,
    product: Partial<Pick<Product, "name" | "price">>
  ) => Promise<void>;
  handleCreateProduct: (
    product: Partial<Pick<Product, "name" | "price">>
  ) => Promise<void>;
};

export type ProductsStore = ProductsState & ProductsActions;

export const initProductStore = (): ProductsState => {
  return { products: [], productsPerPage: 10, currentPage: 1 };
};

export const defaultInitState: ProductsState = {
  products: [],
  productsPerPage: 10,
  currentPage: 1,
};

export const createProductStore = (
  initState: ProductsState = defaultInitState
) => {
  return createStore<ProductsStore>()((set) => {
    return {
      ...initState,
      handleDeleteProduct: async (id) => {
        const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 204) {
          set((state) => ({
            products: state.products.filter((product) => product.id !== id),
          }));
        }
      },
      handleUpdateProduct: async (productId, product) => {
        const res = await fetch(
          `http://localhost:3000/api/products?id=${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        if (res.status === 200) {
          const updatedProduct = await res.json();
          set((state) => ({
            products: state.products.map((product) =>
              product.id === productId ? updatedProduct : product
            ),
          }));
        }
      },
      handleCreateProduct: async (product) => {
        const res = await fetch(`http://localhost:3000/api/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        if (res.status === 201) {
          const newProduct = await res.json();
          set((state) => ({
            products: [...state.products, newProduct],
          }));
          return newProduct;
        }
        return {} as Product;
      },
      setProducts: (products) =>
        set(() => ({
          products,
        })),
      handleChangeCurrentPage: (currentPage) =>
        set(() => ({
          currentPage,
        })),
      handleChangeProductsPerPage: (productsPerPage) =>
        set(() => ({
          productsPerPage,
        })),
    };
  });
};
