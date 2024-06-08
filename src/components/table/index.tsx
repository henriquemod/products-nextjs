"use client";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from "@/components/ui/table";
import { Product } from "@/domain/product";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { ProductTableActions } from "./product-table-actions";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const columnHelper = createColumnHelper<Product>();
const columns: ColumnDef<Product, any>[] = [
  columnHelper.accessor("name", {
    header: "Product",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Last update",
    cell: (info) => formatDate(new Date(info.getValue())),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
    footer: (info) => info.column.id,
  }),
  columnHelper.display({
    header: "Actions",
    cell: (info) => <ProductTableActions />,
  }),
];

interface ProductTableProps {
  products: Product[];
}

export const Table: React.FC<ProductTableProps> = ({
  products,
}: ProductTableProps) => {
  const [data] = useState<Product[]>(products);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable<Product>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const CreateTableHeader = useCallback(() => {
    return table.getHeaderGroups().map((headerGroup) => {
      return (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            const isFirstColumn = i === 0;
            const isLastColumn = i === headerGroup.headers.length - 1;
            let alignClass;
            switch (true) {
              case isFirstColumn:
                alignClass = "text-left";
                break;
              case isLastColumn:
                alignClass = "text-right";
                break;
              default:
                alignClass = "text-center";
                break;
            }
            return (
              <TableHead
                className={`truncate ${alignClass} font-bold`}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      );
    });
  }, [table]);

  return (
    <>
      <UITable className="border">
        <TableHeader>
          <CreateTableHeader />
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow className="text-right" key={row.id}>
                {row.getVisibleCells().map((cell, i) => {
                  const isFirstColumn = i === 0;
                  const isLastColumn = i === row.getVisibleCells().length - 1;
                  let align;
                  switch (true) {
                    case isFirstColumn:
                      align = "text-left";
                      break;
                    case isLastColumn:
                      align = "text-right";
                      break;
                    default:
                      align = "text-center";
                      break;
                  }

                  return (
                    <TableCell className={align} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </UITable>
      <div className="flex items-center gap-2 justify-end text-slate-500 text-sm">
        <Button
          variant="outline"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          variant="outline"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
      </div>
    </>
  );
};
