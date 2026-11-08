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
  type ColumnFiltersState,
  type FilterFn,
  type SortingState,
} from "@tanstack/react-table";
import type { Product } from "@/types/product";
import type { RowData } from "@tanstack/react-table";
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onDeleteProduct?: (product: Product) => void;
    onUpdateProduct?: (product: Product) => void;
  }
}
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddProductDialog } from "./add-product-dialog";
import { Plus } from "lucide-react";

const ALL_CATEGORIES = "All Categories";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  categories: { id: number | string; name: string }[];
  brands: { id: number | string; name: string }[];
  onAddProduct: (formData: FormData) => Promise<void>;
  onDeleteProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  addDialogOpen?: boolean;
  onAddDialogOpenChange?: (open: boolean) => void;
}

// Exact match for the category dropdown
const exactMatchFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const value = row.getValue<string>(columnId) || "Uncategorized";
  return value === filterValue;
};

// Search across the fields users actually care about
const globalSearchFilter: FilterFn<any> = (row, _columnId, filterValue) => {
  const search = String(filterValue).trim().toLowerCase();
  if (!search) return true;

  const { productName, sku, category } = row.original as {
    productName?: string;
    sku?: string;
    category?: string;
  };

  return [productName, sku, category]
    .filter(Boolean)
    .some((field) => String(field).toLowerCase().includes(search));
};

export function DataTable<TData, TValue>({
  columns,
  data,
  categories: productCategories = [],
  brands = [],
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct,
  addDialogOpen,
  onAddDialogOpenChange,
}: DataTableProps<TData, TValue>) {
  // Controlled when the parent passes props, otherwise falls back to internal state
  const [internalAddOpen, setInternalAddOpen] = React.useState(false);
  const addOpen = addDialogOpen ?? internalAddOpen;
  const setAddOpen = onAddDialogOpenChange ?? setInternalAddOpen;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // Derive the select value from table state so there's one source of truth
  const categoryFilter =
    (columnFilters.find((f) => f.id === "category")?.value as
      | string
      | undefined) ?? ALL_CATEGORIES;

  const categories = React.useMemo(() => {
    return Array.from(
      new Set(
        data
          .map((row) => (row as { category?: string }).category)
          .filter((category): category is string => Boolean(category)),
      ),
    ).sort();
  }, [data]);

  // Inject the exact-match filterFn into the category column
  const tableColumns = React.useMemo<ColumnDef<TData, TValue>[]>(
    () =>
      columns.map((col) =>
        "accessorKey" in col && col.accessorKey === "category"
          ? { ...col, filterFn: exactMatchFilter }
          : col,
      ),
    [columns],
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    meta: {
      onDeleteProduct,
      onUpdateProduct,
    },
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: globalSearchFilter,
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

  const handleCategoryChange = (value: string | null) => {
    const next = value ?? ALL_CATEGORIES;
    table
      .getColumn("category")
      ?.setFilterValue(next === ALL_CATEGORIES ? undefined : next);
    // Pagination auto-resets on filter change, no manual setPageIndex needed
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search products..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <div className="flex items-center gap-3">
          <Select value={categoryFilter} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL_CATEGORIES}>All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add Product
          </Button>

          <AddProductDialog
            categories={productCategories}
            brands={brands}
            onSubmit={onAddProduct}
            open={addOpen}
            onOpenChange={setAddOpen}
          />
          <p className="whitespace-nowrap text-sm text-muted-foreground ">
            {table.getFilteredRowModel().rows.length} products
          </p>
        </div>
      </div>

      {/* Table */}
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
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No products found.
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
    </div>
  );
}
