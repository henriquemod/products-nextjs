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
import { useProductsStore } from "@/providers/products-provider";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useState } from "react";
import { productTableColumns } from "./columns";
import { ProductTablePagination } from "./pagination";

interface ProductTableProps {
  products?: Product[];
}

const getAlignment = (i: number, length: number) => {
  if (i === 0) {
    return "text-left w-full";
  } else if (i === length - 1) {
    return "text-right";
  } else {
    return "text-center";
  }
};

export const ProductTable: React.FC<ProductTableProps> = ({
  products: productsFromApi,
}) => {
  const { products, currentPage, productsPerPage, addProduct } =
    useProductsStore((state) => state);

  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: productsPerPage,
  });

  const table = useReactTable<Product>({
    columns: productTableColumns,
    data: products,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  const renderTableHeader = useCallback(
    () =>
      table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            const alignment = getAlignment(i, headerGroup.headers.length);
            return (
              <TableHead
                className={`truncate ${alignment} font-bold`}
                key={header.id}
              >
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </TableHead>
            );
          })}
        </TableRow>
      )),
    [table]
  );

  const renderTableBody = useCallback(
    () =>
      table.getRowModel().rows.map((row) => (
        <TableRow className="text-right" key={row.id}>
          {row.getVisibleCells().map((cell, i) => {
            const alignment = getAlignment(i, row.getVisibleCells().length);
            return (
              <TableCell className={alignment} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      )),
    [table]
  );

  useEffect(() => {
    if (productsFromApi) {
      productsFromApi.forEach(addProduct);
    }
  }, [productsFromApi, addProduct]);

  useEffect(() => {
    setPagination({
      pageIndex: currentPage,
      pageSize: productsPerPage,
    });
  }, [productsPerPage, currentPage]);

  return (
    <>
      <UITable className="border">
        <TableHeader>{renderTableHeader()}</TableHeader>
        <TableBody>{renderTableBody()}</TableBody>
      </UITable>
      <ProductTablePagination
        canGoBack={table.getCanPreviousPage()}
        canGoForward={table.getCanNextPage()}
        handleGoToFirstPage={table.firstPage}
        handleGoToLastPage={table.lastPage}
        handleGoToNextPage={table.nextPage}
        handleGoToPreviousPage={table.previousPage}
        index={table.getState().pagination.pageIndex + 1}
      />
    </>
  );
};
