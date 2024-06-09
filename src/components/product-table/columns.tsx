import { Product } from "@/domain/product";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ProductTableActions } from "./product-table-actions";
import { Label } from "../ui/label";

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
    cell: (info) => (
      <Label className="font-normal text-xs sm:text-sm">
        {info.getValue()}
      </Label>
    ),
  }),
  columnHelper.accessor("updatedAt", {
    header: "Last update",
    cell: (info) => (
      <Label className="font-normal text-xs sm:text-sm">
        {formatDate(new Date(info.getValue()))}
      </Label>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => (
      <Label className="font-normal text-xs sm:text-sm">
        {info.getValue().toFixed(2)}
      </Label>
    ),
  }),
  columnHelper.display({
    header: "Actions",
    cell: (info) => <ProductTableActions product={info.row.original} />,
  }),
];
