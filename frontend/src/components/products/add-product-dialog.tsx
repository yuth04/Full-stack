"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";

import type { AddProductDialogProps } from "@/types/product";
import { useProductForm } from "@/hooks/product/useForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddProductDialog({
  categories = [],
  brands = [],
  onSubmit,
  product = null,
  open = false,
  onOpenChange,
  isSubmitting = false,
}: AddProductDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useProductForm({
    product,
    categories,
    brands,
    onSubmit,
    isSubmitting,
    onAdded: () => onOpenChange?.(false),
  });

  // Reset add form when dialog closes
  useEffect(() => {
    if (!open && !form.isEdit) {
      form.resetForm();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, form.isEdit]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSubmitting) return;

    onOpenChange?.(nextOpen);

    if (!nextOpen && !form.isEdit) {
      form.resetForm();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    form.setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {form.isEdit ? "Edit Product" : "Add Product"}
          </DialogTitle>

          <DialogDescription>
            {form.isEdit
              ? "Update the product information below."
              : "Fill in the information to add a new product."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit} className="space-y-5">
          {/* Product Image */}
          <div className="space-y-2">
            <Label>Product Image</Label>

            <div className="flex items-center gap-4">
              <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                {form.displayImage ? (
                  <Image
                    src={form.displayImage}
                    alt={form.productName || "Product image"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <ImagePlus className="size-8 text-muted-foreground" />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  disabled={form.loading}
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    form.setImage(file);
                  }}
                  className="max-w-[260px]"
                />

                <p className="text-xs text-muted-foreground">
                  Select an image for your product.
                </p>

                {form.image && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-fit"
                    disabled={form.loading}
                    onClick={handleRemoveImage}
                  >
                    <X className="mr-2 size-4" />
                    Remove selected image
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="productName">
              Product Name <span className="text-destructive">*</span>
            </Label>

            <Input
              id="productName"
              placeholder="Enter product name"
              value={form.productName}
              onChange={(event) => form.setProductName(event.target.value)}
              required
              disabled={form.loading}
            />
          </div>

          {/* Category and Brand */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>

              <Select
                items={form.categoryItems}
                value={form.categoryId}
                onValueChange={(value) => form.setCategoryId(value ?? "")}
                disabled={form.loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {form.categoryItems.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Brand</Label>

              <Select
                items={form.brandItems}
                value={form.brandId}
                onValueChange={(value) => form.setBrandId(value ?? "")}
                disabled={form.loading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>

                <SelectContent>
                  {form.brandItems.map((brand) => (
                    <SelectItem key={brand.value} value={brand.value}>
                      {brand.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">
                Price ($) <span className="text-destructive">*</span>
              </Label>

              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={(event) => form.setPrice(event.target.value)}
                required
                disabled={form.loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>

              <Input
                id="qty"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={form.qty}
                onChange={(event) => form.setQty(event.target.value)}
                disabled={form.loading}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>

            <Select
              value={form.isActive}
              onValueChange={(value) => form.setIsActive(value ?? "Active")}
              disabled={form.loading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              placeholder="Enter product description"
              value={form.description}
              onChange={(event) => form.setDescription(event.target.value)}
              rows={3}
              disabled={form.loading}
            />
          </div>
          {/* Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={form.loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={form.loading}>
              {form.loading && <Loader2 className="mr-2 size-4 animate-spin" />}

              {form.loading
                ? "Saving..."
                : form.isEdit
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
