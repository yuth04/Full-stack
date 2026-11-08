
"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import type {
  Category,
  CategoryPayload,
} from "@/types/categories";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AddCategoryDialog } from "./add-category-dialog";
import { EditCategoryDialog } from "./edit-category-dialog";
import { DeleteCategoryDialog } from "./delete-prodoct-dialog";

interface DataTableProps {
  columns: ColumnDef<Category>[];
  data: Category[];

  onCreateCategory: (
    payload: CategoryPayload
  ) => Promise<void>;

  onUpdateCategory: (
    id: number,
    payload: CategoryPayload
  ) => Promise<void>;

  onDeleteCategory: (
    id: number
  ) => Promise<void>;
}

export function DataTable({
  columns,
  data,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}: DataTableProps) {
  // Table states
  const [sorting, setSorting] =
    React.useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] =
    React.useState("");

  const [statusFilter, setStatusFilter] =
    React.useState("All");

  // Edit dialog states
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const [editOpen, setEditOpen] =
    React.useState(false);

  // Delete dialog states
  const [deleteCategory, setDeleteCategory] =
    React.useState<Category | null>(null);

  const [deleteOpen, setDeleteOpen] =
    React.useState(false);

  const [deleting, setDeleting] =
    React.useState(false);

  // Filter categories by status
  const filteredData = React.useMemo(() => {
    if (statusFilter === "All") {
      return data;
    }

    return data.filter((category) =>
      statusFilter === "Active"
        ? category.isActive
        : !category.isActive
    );
  }, [data, statusFilter]);

  // Edit category
  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  // Open delete confirmation
  const handleOpenDeleteDialog = (category: Category) => {
    setDeleteCategory(category);
    setDeleteOpen(true);
  };

  // Delete category
  const handleDeleteCategory = async () => {
    if (!deleteCategory) return;

    try {
      setDeleting(true);

      await onDeleteCategory(deleteCategory.id);

      setDeleteOpen(false);
      setDeleteCategory(null);
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setDeleting(false);
    }
  };

  // TanStack table
  const table = useReactTable({
    data: filteredData,
    columns,

    meta: {
      onEditCategory: handleEditCategory,
      onDeleteCategory: handleOpenDeleteDialog,
    },

    state: {
      sorting,
      globalFilter,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    globalFilterFn: "includesString",

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Reset pagination when filters change
  React.useEffect(() => {
    table.setPageIndex(0);
  }, [globalFilter, statusFilter, table]);

  return (
    <div className="space-y-4">

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <Input
            placeholder="Search categories..."
            value={globalFilter}
            onChange={(event) =>
              setGlobalFilter(event.target.value)
            }
            className="w-full sm:max-w-sm"
          />

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value ?? "All")
            }
          >
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All">
                All Status
              </SelectItem>

              <SelectItem value="Active">
                Active
              </SelectItem>

              <SelectItem value="Inactive">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>

        </div>

        {/* Create Category and Count */}
        <div className="flex items-center gap-3">
          <AddCategoryDialog
            onSubmit={onCreateCategory}
          />

          <p className="whitespace-nowrap text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} categories
          </p>
        </div>
      </div>

      {/* Category Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(table.getPageCount(), 1)}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Category Dialog */}
      {selectedCategory && (
        <EditCategoryDialog
          category={selectedCategory}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSubmit={onUpdateCategory}
        />
      )}

      {/* Delete Category Dialog */}
      {deleteCategory && (
        <DeleteCategoryDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          categoryName={deleteCategory.name}
          onConfirm={handleDeleteCategory}
          loading={deleting}
        />
      )}
    </div>
  );
}
