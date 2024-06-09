import { Product } from "@/domain/product";
import { createStore } from "zustand/vanilla";

export type ProductsState = {
  products: Product[];
  productsPerPage: number;
  currentPage: number;
};

export type ApiResponse =
  | { type: "OK" }
  | { type: "BAD_REQUEST"; message: string | string[] }
  | { type: "UNAUTHORIZED" }
  | { type: "NOT_FOUND" }
  | { type: "INTERNAL_SERVER_ERROR" };

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

const handleErrorResponse = async (res: Response): Promise<ApiResponse> => {
  if (res.status === 400) {
    const message = await res.json();
    return { type: "BAD_REQUEST", message };
  }
  if (res.status === 401) {
    return { type: "UNAUTHORIZED" };
  }
  if (res.status === 404) {
    return { type: "NOT_FOUND" };
  }
  return { type: "INTERNAL_SERVER_ERROR" };
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
