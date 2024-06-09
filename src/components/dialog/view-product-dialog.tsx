"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Product } from "@/domain/product";
import React from "react";
import { formatDate } from "../header/format-date";

interface ViewProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const ViewProductDialog: React.FC<ViewProductDialogProps> = ({
  open,
  onClose,
  product,
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Product info</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {[
          { label: "Name", value: product.name, id: "name" },
          { label: "Price", value: product.price.toString(), id: "price" },
          {
            label: "Created at",
            value: formatDate(new Date(product.createdAt)),
            id: "createdAt",
          },
          {
            label: "Updated at",
            value: formatDate(new Date(product.updatedAt)),
            id: "updatedAt",
          },
        ].map(({ label, value, id }) => (
          <div key={id} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={id} className="text-right">
              {label}
            </Label>
            <Input
              disabled
              id={id}
              defaultValue={value}
              className="col-span-3"
            />
          </div>
        ))}
      </div>
      <DialogFooter className="w-full">
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ViewProductDialog;
