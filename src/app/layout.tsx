import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { ProductsStoreProvider } from "@/providers/products-provider";
import { UserStoreProvider } from "@/providers/user-provider";
import ToastProvider from "@/components/toast-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Products App",
  description: "Manage your products",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-gray-100",
          fontSans.variable
        )}
      >
        <UserStoreProvider>
          <ProductsStoreProvider>
            <ToastProvider
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {children}
          </ProductsStoreProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
