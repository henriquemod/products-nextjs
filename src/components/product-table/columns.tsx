import { Product } from "@/domain/product";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ProductTableActions } from "./product-table-actions";
import { formatDate } from "../header/format-date";

const columnHelper = createColumnHelper<Product>();

export const productTableColumns: ColumnDef<Product, any>[] = [
  columnHelper.accessor("name", {
    header: "Product",
    cell: (info) => (
      <h4 className="font-normal text-xs sm:text-sm">{info.getValue()}</h4>
    ),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Last update",
    cell: (info) => (
      <h4 className="font-normal text-xs sm:text-sm">
        {formatDate(new Date(info.getValue()))}
      </h4>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <h4 className="font-normal text-xs sm:text-sm">
        ${info.getValue().toFixed(2)}
      </h4>
    ),
  }),
  columnHelper.display({
    header: "Actions",
    cell: (info) => <ProductTableActions product={info.row.original} />,
  }),
];
