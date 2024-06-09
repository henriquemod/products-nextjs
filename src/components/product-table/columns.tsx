import { Product } from "@/domain/product";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ProductTableActions } from "./product-table-actions";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const columnHelper = createColumnHelper<Product>();

export const productTableColumns: ColumnDef<Product, any>[] = [
  columnHelper.accessor("name", {
    header: "Product",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Last update",
    cell: (info) => formatDate(new Date(info.getValue())),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.display({
    header: "Actions",
    cell: (info) => <ProductTableActions product={info.row.original} />,
  }),
];
