"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  open,
  onClose,
  onDelete,
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this product?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex flex-row justify-end gap-2 mt-4">
        <Button className="w-32" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="w-32" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteProductDialog;
