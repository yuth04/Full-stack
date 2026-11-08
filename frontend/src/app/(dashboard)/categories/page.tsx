"use client";

import { useEffect, useState } from "react";

import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/categories/data-table";
import { Loading } from "@/components/SpinnerButton";

import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/category/useCategories";
import { useMinimumLoading } from "@/hooks/useLoading";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CategoriesPage() {
  // READ
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useCategories();

  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: editCategory } = useUpdateCategory();
  const { mutateAsync: removeCategory } = useDeleteCategory();

  const showLoading = useMinimumLoading(isLoading, 1000);

  if (showLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4 px-2 py-3">
      <div className="flex justify-between">
        <div>
          {" "}
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage your category inventory.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export
          </Button>
        </div>
      </div>

      {isError && (
        <div className="flex items-center justify-between rounded-md border border-destructive/30 p-4 text-sm text-destructive">
          <span>
            {error instanceof Error
              ? error.message
              : "Failed to fetch categories."}
          </span>

          <button onClick={() => refetch()} className="underline">
            Retry
          </button>
        </div>
      )}

      {!isError && (
        <DataTable
          columns={columns}
          data={categories}
          onCreateCategory={createCategory}
          onUpdateCategory={(id, payload) => editCategory({ id, payload })}
          onDeleteCategory={removeCategory}
        />
      )}
    </div>
  );
}
