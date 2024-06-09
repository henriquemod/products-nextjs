"use client";
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
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
  price: string;
  onNameChange: (name: string) => void;
  onPriceChange: (price: string) => void;
  onSave: () => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  open,
  onClose,
  name,
  price,
  onNameChange,
  onPriceChange,
  onSave,
}) => {
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

  const handleSave = () => {
    if (validateFields()) {
      onSave();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Name
            </Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="col-span-3"
            />
            {nameError && (
              <p className="text-red-500 text-sm col-span-4 text-right">
                {nameError}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-price" className="text-right">
              Price
            </Label>
            <Input
              id="edit-price"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              className="col-span-3"
            />
            {priceError && (
              <p className="text-red-500 text-sm col-span-4 text-right">
                {priceError}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button className="w-32" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-32" variant="default" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
