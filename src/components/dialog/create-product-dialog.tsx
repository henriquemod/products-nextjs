"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface CreateProductDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (product: { name: string; price: number }) => void;
}

export const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);

  const validateFields = () => {
    let valid = true;

    if (!name) {
      setNameError("Name is required.");
      valid = false;
    } else {
      setNameError(null);
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      setPriceError("Price must be a valid number greater than zero.");
      valid = false;
    } else {
      setPriceError(null);
    }

    return valid;
  };

  const handleCreate = () => {
    if (validateFields()) {
      onCreate({ name, price: parseFloat(price) });
      setName("");
      setPrice("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create-name" className="text-right">
              Name
            </Label>
            <Input
              id="create-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
            {nameError && (
              <p className="text-red-500 text-sm col-span-4 text-right">
                {nameError}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create-price" className="text-right">
              Price
            </Label>
            <Input
              id="create-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
            />
            {priceError && (
              <p className="text-red-500 text-sm col-span-4 text-right">
                {priceError}
              </p>
            )}
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button className="w-32" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-32" variant="default" onClick={handleCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
