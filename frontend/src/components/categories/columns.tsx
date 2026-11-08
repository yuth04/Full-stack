"use client";

import type { ColumnDef, RowData } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import type { Category } from "@/types/categories";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onEditCategory?: (category: Category) => void;
    onDeleteCategory?: (category: Category) => void;
  }
}

export const columns: ColumnDef<Category>[] = [
  // ID
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },

  // Category name
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },

  // Description
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.description || "No description"}
      </span>
    ),
  },

  // Product count
  {
    id: "products",
    header: "Products",
    cell: ({ row }) => {
      const productCount = row.original.Products?.length ?? 0;

      return (
        <span className="font-medium">
          {productCount}{" "}
          <span className="text-muted-foreground font-normal">
            {productCount === 1 ? "product" : "products"}
          </span>
        </span>
      );
    },
  },

  // Status
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  // Actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            {/* Edit */}
            <DropdownMenuItem
              onClick={() => {
                table.options.meta?.onEditCategory?.(category);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Delete */}
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {
                table.options.meta?.onDeleteCategory?.(category);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
