"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useState } from "react";
import { buildImageUrl } from "@/lib/image";
// Product image preview
function ProductImage({ src, name }: { src: string | null; name: string }) {
  const [open, setOpen] = useState(false);

  const imageUrl = buildImageUrl(src);

  if (!imageUrl) {
    return (
      <div className="flex size-12 items-center justify-center rounded-md border bg-muted text-xs">
        No image
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative size-12 overflow-hidden rounded-md border"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-2">
          <DialogTitle className="sr-only">{name}</DialogTitle>

          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <ProductImage src={row.original.image} name={row.original.productName} />
    ),
  },

  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div className="min-w-[160px]">
        <p className="font-medium">{row.original.productName}</p>
        <p className="text-xs text-muted-foreground">SKU: {row.original.sku}</p>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.category || "Uncategorized"}
      </span>
    ),
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.brand || "Unbranded"}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium">
        ${Number(row.original.price).toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "qty",
    header: "Stock",
    cell: ({ row }) => {
      const qty = row.original.qty;

      return (
        <span
          className={
            qty <= 0
              ? "font-medium text-destructive"
              : qty <= 10
                ? "font-medium text-orange-500"
                : ""
          }
        >
          {qty}
        </span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;

      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row, table }) => {
      const product = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Open actions</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => table.options.meta?.onUpdateProduct?.(product)}
              >
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() => table.options.meta?.onDeleteProduct?.(product)}
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
