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
import React from "react";

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
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription>
          Make changes to the product details below.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {[
          {
            label: "Name",
            value: name,
            onChange: onNameChange,
            id: "edit-name",
          },
          {
            label: "Price",
            value: price,
            onChange: onPriceChange,
            id: "edit-price",
          },
        ].map(({ label, value, onChange, id }) => (
          <div key={id} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={id} className="text-right">
              {label}
            </Label>
            <Input
              id={id}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="col-span-3"
            />
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button className="w-32" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="w-32" variant="default" onClick={onSave}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default EditProductDialog;
