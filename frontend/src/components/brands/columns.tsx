
"use client";

import Image from "next/image";
import { useState } from "react";
import type { ColumnDef, RowData } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Brand } from "@/types/brand";
import { buildImageUrl } from "@/lib/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Brand logo preview
function BrandLogo({
  src,
  name,
}: {
  src: string | null;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const imageUrl = buildImageUrl(src);

  if (!imageUrl) {
    return (
      <div className="flex size-12 items-center justify-center rounded-md border bg-muted text-xs">
        No logo
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative size-12 overflow-hidden rounded-md border bg-white"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="48px"
          className="object-contain p-1"
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-4">
          <DialogTitle className="sr-only">{name}</DialogTitle>

          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 512px"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onUpdateBrand?: (brand: Brand) => void;
    onDeleteBrand?: (brand: Brand) => void;
  }
}

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <BrandLogo
        src={row.original.logo}
        name={row.original.name}
      />
    ),
  },

  {
    accessorKey: "name",
    header: "Brand",
    cell: ({ row }) => (
      <div className="min-w-[140px]">
        <p className="font-medium">{row.original.name}</p>
      </div>
    ),
  },

  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.slug}
      </span>
    ),
  },

  {
    id: "products",
    header: "Products",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.Products?.length ?? 0}
      </span>
    ),
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
      const brand = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                >
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Open actions</span>
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  table.options.meta?.onUpdateBrand?.(brand)
                }
              >
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  table.options.meta?.onDeleteBrand?.(brand)
                }
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
