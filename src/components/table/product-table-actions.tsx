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
import { Edit, Info, Settings, Trash } from "lucide-react";
import React from "react";

export const ProductTableActions: React.FC = () => {
  return (
    <Menubar className="justify-end">
      <MenubarMenu>
        <MenubarTrigger>
          <Settings className="w-6 text-slate-500" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Info
            <MenubarShortcut>
              <Info className="w-4" />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Update
            <MenubarShortcut>
              <Edit className="w-4" />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            Delete
            <MenubarShortcut>
              <Trash className="w-4 text-red-500" />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
