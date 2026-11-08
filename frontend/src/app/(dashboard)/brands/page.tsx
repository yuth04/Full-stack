"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/brands/data-table";
import { columns } from "@/components/brands/columns";
import { useBrands } from "@/hooks/brand/useBrands";

import type { Brand } from "@/types/brand";
import { Loading } from "@/components/SpinnerButton";
import { useMinimumLoading } from "@/hooks/useLoading";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function BrandsPage() {
  const { data: brands, isLoading, isError } = useBrands();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const showLoading = useMinimumLoading(isLoading, 1000);

  if (showLoading) {
    return <Loading />;
  }
  {
    isError && (
      <div className="flex items-center justify-between rounded-md border border-destructive/30 p-4 text-sm text-destructive">
        <span>{isError}</span>

        <button onClick={useBrands} className="underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-2 py-3">
      <div className="flex justify-between">
        <div>
          {" "}
          <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
          <p className="text-sm text-muted-foreground">
            Manage your brand inventory.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={brands ?? []}
        onAddBrand={() => setAddOpen(true)}
        onUpdateBrand={(brand) => {
          setSelectedBrand(brand);
          setEditOpen(true);
        }}
        onDeleteBrand={(brand) => {
          setSelectedBrand(brand);
          setDeleteOpen(true);
        }}
      />

      {/* Add, Edit, and Delete dialogs go here */}
    </div>
  );
}
