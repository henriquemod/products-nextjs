"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Product } from "@/domain/product";
import { useNotification } from "@/hook/use-notification";
import { useProductsStore } from "@/providers/products-provider";
import { useUserStore } from "@/providers/user-provider";
import { Edit, Info, Settings, Trash } from "lucide-react";
import React, { useState } from "react";
import DeleteProductDialog from "../dialog/delete-product-dialog";
import EditProductDialog from "../dialog/edit-product-dialog";
import ViewProductDialog from "../dialog/view-product-dialog";

interface ProductTableActionsProps {
  product: Product;
}

export const ProductTableActions: React.FC<ProductTableActionsProps> = ({
  product,
}) => {
  const { accessToken } = useUserStore((state) => state);
  const { deleteProduct, updateProduct } = useProductsStore((state) => state);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { handleApiResponse } = useNotification();

  const handleSave = async (name: string, price: string) => {
    const res = await updateProduct(product.id, {
      name,
      price: parseFloat(price),
    });
    handleApiResponse({
      res,
      successMessage: `Product ${name} updated successfully`,
      onSuccess: () => {
        setOpenEdit(false);
      },
    });
  };

  const handleDelete = async () => {
    const res = await deleteProduct(product.id);
    handleApiResponse({
      res,
      successMessage: `Product ${product.name} deleted successfully`,
      onSuccess: () => {
        setOpenDelete(false);
      },
    });
  };

  return (
    <>
      <Menubar className="justify-end">
        <MenubarMenu>
          <MenubarTrigger>
            <Settings className="w-6 cursor-pointer text-slate-500" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setOpenView(true)}>
              Info
              <MenubarShortcut>
                <Info className="w-4" />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              disabled={!accessToken}
              onClick={() => setOpenEdit(true)}
            >
              Edit
              <MenubarShortcut>
                <Edit className="w-4" />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              disabled={!accessToken}
              onClick={() => setOpenDelete(true)}
            >
              Delete
              <MenubarShortcut>
                <Trash className="w-4 text-red-500" />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <ViewProductDialog
        open={openView}
        onClose={() => setOpenView(false)}
        product={product}
      />
      <EditProductDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        product={product}
        onSave={handleSave}
      />
      <DeleteProductDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />
    </>
  );
};
