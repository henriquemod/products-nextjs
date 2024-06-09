import { ApiResponse } from "@/domain/api-response";
import { Product } from "@/domain/product";
import { createStore } from "zustand/vanilla";
import { handleErrorResponse } from "./helpers/handle-error-response";

export type ProductsState = {
  products: Product[];
  productsPerPage: number;
  currentPage: number;
};

export type ProductsActions = {
  setProducts: (products: Product[]) => void;
  changeProductsPerPage: (productsPerPage: number) => void;
  changeCurrentPage: (currentPage: number) => void;
  deleteProduct: (id: string) => Promise<ApiResponse>;
  updateProduct: (
    productId: string,
    product: Partial<Pick<Product, "name" | "price">>
  ) => Promise<ApiResponse>;
  createProduct: (
    product: Partial<Pick<Product, "name" | "price">>
  ) => Promise<ApiResponse>;
};

export type ProductsStore = ProductsState & ProductsActions;

const defaultInitState: ProductsState = {
  products: [],
  productsPerPage: 10,
  currentPage: 1,
};

export const createProductStore = (
  initState: ProductsState = defaultInitState
) => {
  return createStore<ProductsStore>()((set) => ({
    ...initState,
    setProducts: (products) => set(() => ({ products })),
    changeProductsPerPage: (productsPerPage) =>
      set(() => ({ productsPerPage })),
    changeCurrentPage: (currentPage) => set(() => ({ currentPage })),

    deleteProduct: async (id): Promise<ApiResponse> => {
      const res = await fetch(`http://localhost:3000/api/products?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 204) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
        return { type: "OK" };
      }

      return handleErrorResponse(res);
    },

    updateProduct: async (productId, product): Promise<ApiResponse> => {
      const res = await fetch(
        `http://localhost:3000/api/products?id=${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        }
      );

      if (res.status === 200) {
        const updatedProduct = await res.json();
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? updatedProduct : p
          ),
        }));
        return { type: "OK" };
      }

      return handleErrorResponse(res);
    },

    createProduct: async (product): Promise<ApiResponse> => {
      const res = await fetch(`http://localhost:3000/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.status === 201) {
        const newProduct = await res.json();
        set((state) => ({ products: [...state.products, newProduct] }));
        return { type: "OK" };
      }

      return handleErrorResponse(res);
    },
  }));
};
