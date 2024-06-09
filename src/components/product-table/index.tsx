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
import { useNotification } from "@/hook/use-notification";
import { useProductsStore } from "@/providers/products-provider";
import { useUserStore } from "@/providers/user-provider";
import cookieCutter from "@boiseitguru/cookie-cutter";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { CirclePlus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { CreateProductDialog } from "../dialog/create-product-dialog";
import { Button } from "../ui/button";
import { productTableColumns } from "./columns";
import { ProductTablePagination } from "./pagination";

interface ProductTableProps {
  products?: Product[];
}

const getAlignment = (i: number) => {
  if (i === 0) {
    return "text-left w-full";
  } else {
    return "text-center";
  }
};

export const ProductTable: React.FC<ProductTableProps> = ({
  products: productsFromApi,
}) => {
  const { products, currentPage, productsPerPage, setProducts, createProduct } =
    useProductsStore((state) => state);
  const { setAccessToken, accessToken } = useUserStore((state) => state);
  const { handleApiResponse } = useNotification();
  const [openCreate, setOpenCreate] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: currentPage,
    pageSize: productsPerPage,
  });

  const table = useReactTable<Product>({
    columns: productTableColumns,
    data: products,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const renderTableHeader = useCallback(
    () =>
      table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, i) => {
            const alignment = getAlignment(i);
            return (
              <TableHead
                className={`truncate ${alignment} font-bold text-xs sm:text-sm p-1 xs:p-2 sm:p-4`}
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
            const alignment = getAlignment(i);
            return (
              <TableCell
                className={`${alignment} p-1 xs:p-2 sm:p-4`}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      )),
    [table, products]
  );

  const handleCreate = async (product: { name: string; price: number }) => {
    const res = await createProduct(product);
    handleApiResponse({
      res,
      successMessage: `Product ${product.name} created successfully!`,
      onSuccess: () => setOpenCreate(false),
    });
  };

  useEffect(() => {
    if (productsFromApi) {
      setProducts(productsFromApi);
    }
  }, [productsFromApi, setProducts]);

  useEffect(() => {
    setPagination({
      pageIndex: currentPage,
      pageSize: productsPerPage,
    });
  }, [productsPerPage, currentPage]);

  useEffect(() => {
    const userAccessToken = cookieCutter.get("acess-token");
    if (userAccessToken) {
      setAccessToken(userAccessToken);
    }
  }, [setAccessToken]);

  return (
    <div className="min-w-[374px]">
      {accessToken && (
        <div className="w-full flex justify-end pr-1 pb-4">
          <Button
            id="add-product-btn"
            variant="ghost"
            onClick={() => setOpenCreate(true)}
          >
            <CirclePlus className="text-green-500 w-8 h-8" />
          </Button>
        </div>
      )}
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
      <CreateProductDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};
