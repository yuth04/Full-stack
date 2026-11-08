"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DataTable } from "@/components/products/data-table";
import { columns } from "@/components/products/columns";
import { DeleteProductDialog } from "@/components/products/DeleteProductDialog";
import { AddProductDialog } from "@/components/products/add-product-dialog";

import type { Product } from "@/types/product";
import { useMinimumLoading } from "@/hooks/useLoading";
import { Loading } from "@/components/SpinnerButton";
import { useProducts } from "@/hooks/product/useProduct";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const {
    products,
    categories,
    brands,
    loading: isLoading,
    error,
    addProduct,
    fetchProducts,

    // Delete
    deleteDialogOpen,
    selectedProduct,
    deleting,
    setDeleteDialogOpen,
    setSelectedProduct,
    deleteProduct,

    // Edit
    setEditDialogOpen,
    setEditingProduct,
    editDialogOpen,
    editingProduct,
    updateProduct,
  } = useProducts();

  // Minimum loading time
  const showLoading = useMinimumLoading(isLoading, 1000);

  // Open Add Product dialog when URL contains ?action=new
  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setAddDialogOpen(true);
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditDialogChange = (open: boolean) => {
    setEditDialogOpen(open);

    if (!open) {
      setEditingProduct(null);
    }
  };

  const handleUpdateProduct = async (formData: FormData) => {
    if (!editingProduct) return;

    await updateProduct(editingProduct.id, formData);
    setEditDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    await deleteProduct(selectedProduct.id);
  };

  if (showLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 px-3 py-2">
      {/* Page Header */}
      <div className="flex justify-between">
        <div>
          {" "}
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your product inventory.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center justify-between rounded-md border border-destructive/30 p-4 text-sm text-destructive">
          <span>{error}</span>

          <button type="button" onClick={fetchProducts} className="underline">
            Retry
          </button>
        </div>
      )}

      {/* Products Table */}
      <DataTable
        columns={columns}
        data={products}
        categories={categories}
        brands={brands}
        onAddProduct={addProduct}
        addDialogOpen={addDialogOpen}
        onAddDialogOpenChange={setAddDialogOpen}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleEditProduct}
      />

      {/* Edit Product Dialog */}
      {editingProduct && (
        <AddProductDialog
          key={editingProduct.id}
          product={editingProduct}
          open={editDialogOpen}
          onOpenChange={handleEditDialogChange}
          categories={categories}
          brands={brands}
          onSubmit={handleUpdateProduct}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        productName={selectedProduct?.productName ?? ""}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContent />
    </Suspense>
  );
}
