
"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import {
  getProducts,
  createProduct,
  updateProduct as updateProductApi,
} from "@/services/product.service";

import { getCategories } from "@/services/category.service";
import { getBrands } from "@/services/brand.service";
import api from "@/lib/axois";

import { showToast } from "@/lib/toast";

import type { Product } from "@/types/product";

const PRODUCT_KEY = ["products"];
const CATEGORY_KEY = ["categories"];
const BRAND_KEY = ["brands"];

type ApiError = {
  message?: string;
};

function getErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<ApiError>;

  return (
    axiosError.response?.data?.message ||
    axiosError.message ||
    fallback
  );
}

export function useProducts() {
  const queryClient = useQueryClient();

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products
  const {
    data: products = [],
    isLoading: loading,
    isError,
    error,
    refetch: fetchProducts,
  } = useQuery({
    queryKey: PRODUCT_KEY,
    queryFn: async (): Promise<Product[]> => {
      const data = await getProducts();

      return data.map((p: any) => ({
        ...p,
        category_id: p.Category?.id ?? null,
        brand_id: p.Brand?.id ?? null,
      }));
    },
  });

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: CATEGORY_KEY,
    queryFn: getCategories,
  });

  // Fetch brands
  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: BRAND_KEY,
    queryFn: getBrands,
  });

  // Create product
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PRODUCT_KEY,
      });

      showToast.success("Product created successfully.");
    },

    onError: (error) => {
      showToast.error(
        getErrorMessage(error, "Failed to create product.")
      );
    },
  });

  // Update product
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => updateProductApi(id, formData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PRODUCT_KEY,
      });

      showToast.success("Product updated successfully.");

      setEditDialogOpen(false);
      setEditingProduct(null);
    },

    onError: (error) => {
      showToast.error(
        getErrorMessage(error, "Failed to update product.")
      );
    },
  });

  // Delete product
  const deleteMutation = useMutation({
    mutationFn: (productId: number) =>
      api.delete(`/products/${productId}`),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PRODUCT_KEY,
      });

      showToast.success("Product deleted successfully.");

      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    },

    onError: (error) => {
      showToast.error(
        getErrorMessage(error, "Failed to delete product.")
      );
    },
  });

  return {
    // Data
    products,
    categories,
    brands,
    brandsLoading,

    // Loading and error
    loading,
    categoriesLoading,

    error: isError
      ? getErrorMessage(error, "Failed to fetch products.")
      : null,

    // Create
    addProduct: createMutation.mutateAsync,
    creating: createMutation.isPending,

    // Update
    updateProduct: (id: number, formData: FormData) =>
      updateMutation.mutateAsync({ id, formData }),
    updating: updateMutation.isPending,

    // Delete
    deleteProduct: deleteMutation.mutateAsync,
    deleting: deleteMutation.isPending,

    // Delete dialog
    deleteDialogOpen,
    selectedProduct,
    setDeleteDialogOpen,
    setSelectedProduct,

    // Edit dialog
    editDialogOpen,
    editingProduct,
    setEditDialogOpen,
    setEditingProduct,

    // Refetch
    fetchProducts,
  };
}
