"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useProductsStore } from "@/providers/products-provider";

interface ProductTableActionsProps {
  handleGoToFirstPage: () => void;
  handleGoToLastPage: () => void;
  handleGoToNextPage: () => void;
  handleGoToPreviousPage: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  index: number;
}

export const ProductTablePagination: React.FC<ProductTableActionsProps> = ({
  handleGoToFirstPage,
  handleGoToLastPage,
  handleGoToNextPage,
  handleGoToPreviousPage,
  canGoBack,
  canGoForward,
  index,
}: ProductTableActionsProps) => {
  const {
    handleChangeCurrentPage,
    handleChangeProductsPerPage,
    productsPerPage,
  } = useProductsStore((state) => state);

  return (
    <div className="flex items-center gap-2 justify-end text-slate-500 text-sm">
      <Button
        variant="outline"
        onClick={handleGoToFirstPage}
        disabled={!canGoBack}
        className="hidden sm:block"
      >
        {"<<"}
      </Button>
      <Button
        variant="outline"
        onClick={handleGoToPreviousPage}
        disabled={!canGoBack}
      >
        {"<"}
      </Button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>{`${index} of ${productsPerPage}`}</strong>
      </span>
      <Button
        variant="outline"
        onClick={handleGoToNextPage}
        disabled={!canGoForward}
      >
        {">"}
      </Button>
      <Button
        variant="outline"
        onClick={handleGoToLastPage}
        disabled={!canGoForward}
        className="hidden sm:block"
      >
        {">>"}
      </Button>
      <Select
        onValueChange={(value) => {
          handleChangeCurrentPage(0);
          handleChangeProductsPerPage(Number(value));
        }}
        value={productsPerPage.toString()}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Products per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[5, 10, 15, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
