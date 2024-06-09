import { Product } from "@/domain/product";
import { createStore } from "zustand/vanilla";

export type ProductsState = {
  products: Product[];
  productsPerPage: number;
  currentPage: number;
};

export type ProductsActions = {
  addProduct: (product: Product) => void;
  handleChangeProductsPerPage: (productsPerPage: number) => void;
  handleChangeCurrentPage: (currentPage: number) => void;
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
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
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
