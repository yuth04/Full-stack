
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "@/services/brand.service";

import type { BrandInput } from "@/types/brand";
import { showToast } from "@/lib/toast";

const QUERY_KEY = ["brands"];

// GET ALL BRANDS
export function useBrands() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getBrands,
  });
}

// GET BRAND BY ID
export function useBrand(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => getBrandById(id),
    enabled: !!id,
  });
}

// CREATE BRAND
export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrand,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      showToast.success("Brand created successfully.");
    },

    onError: (error) => {
      console.error("Create brand failed:", error);

      showToast.error(
        error instanceof Error
          ? error.message
          : "Failed to create brand."
      );
    },
  });
}

// UPDATE BRAND
export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<BrandInput>;
    }) => updateBrand(id, data),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: [...QUERY_KEY, variables.id],
        }),
      ]);

      showToast.success("Brand updated successfully.");
    },

    onError: (error) => {
      console.error("Update brand failed:", error);

      showToast.error(
        error instanceof Error
          ? error.message
          : "Failed to update brand."
      );
    },
  });
}

// DELETE BRAND
export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBrand,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      showToast.success("Brand deleted successfully.");
    },

    onError: (error) => {
      console.error("Delete brand failed:", error);

      showToast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete brand."
      );
    },
  });
}
