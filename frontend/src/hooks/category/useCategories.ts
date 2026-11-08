"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createCategory as createCategoryService,
  deleteCategory as deleteCategoryService,
  getCategories,
  updateCategory as updateCategoryService,
} from "@/services/category.service";

import type { Category, CategoryPayload } from "@/types/categories";

import { showToast } from "@/lib/toast";

const QUERY_KEY = ["categories"];

// READ: Fetch all categories
export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async (): Promise<Category[]> => {
      const data = await getCategories();

      return data.map((category) => ({
        ...category,
        id: Number(category.id),
      }));
    },
  });
}

// CREATE: Create category
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CategoryPayload) => createCategoryService(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      showToast.success("Category created successfully.");
    },

    onError: (error) => {
      console.error("Create category error:", error);

      showToast.error(
        error instanceof Error ? error.message : "Failed to create category.",
      );
    },
  });
}

// UPDATE: Edit category
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CategoryPayload }) =>
      updateCategoryService(id, payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      showToast.success("Category updated successfully.");
    },

    onError: (error) => {
      console.error("Update category failed:", error);

      showToast.error(
        error instanceof Error ? error.message : "Failed to update category.",
      );
    },
  });
}

// DELETE: Remove category
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategoryService(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      showToast.success("Category deleted successfully.");
    },

    onError: (error) => {
      console.error("Delete category failed:", error);

      showToast.error(
        error instanceof Error ? error.message : "Failed to delete category.",
      );
    },
  });
}
