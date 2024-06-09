"use client";
import { Button } from "@/components/ui/button";
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
import { useProductsStore } from "@/providers/products-provider";
import { useUserStore } from "@/providers/user-provider";
import { Edit, Info, Settings, Trash } from "lucide-react";
import React, { useState } from "react";
import ViewProductDialog from "../dialog/view-product-dialog";
import EditProductDialog from "../dialog/edit-product-dialog";
import DeleteProductDialog from "../dialog/delete-product-dialog";

interface ProductTableActionsProps {
  product: Product;
}

export const ProductTableActions: React.FC<ProductTableActionsProps> = ({
  product,
}) => {
  const { accessToken } = useUserStore((state) => state);
  const { handleDeleteProduct, handleUpdateProduct } = useProductsStore(
    (state) => state
  );
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());

  const handleSave = async () => {
    await handleUpdateProduct(product.id, { name, price: parseFloat(price) });
    setOpenEdit(false);
  };

  const handleDelete = async () => {
    await handleDeleteProduct(product.id);
    setOpenDelete(false);
  };

  return (
    <>
      <Menubar className="justify-end">
        <MenubarMenu>
          <MenubarTrigger>
            <Settings className="w-6 text-slate-500" />
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
              Update
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
        name={name}
        price={price}
        onNameChange={setName}
        onPriceChange={setPrice}
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
