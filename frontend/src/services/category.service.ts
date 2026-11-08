import api from "@/lib/axois";
import type { Category, CategoryPayload } from "@/types/categories";
import axios from "axios";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

function unwrap<T>(result: T | ApiResponse<T>): T {
  if (typeof result === "object" && result !== null && "data" in result) {
    return (result as ApiResponse<T>).data;
  }

  return result as T;
}

// READ: Get all categories
export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[] | ApiResponse<Category[]>>(
    "/categories",
  );

  return unwrap(response.data);
}

// READ: Get category by ID (optional)
export async function getCategoryById(id: number): Promise<Category> {
  const response = await api.get<Category | ApiResponse<Category>>(
    `/categories/${id}`,
  );

  return unwrap(response.data);
}

// CREATE: Create category
export async function createCategory(
  payload: CategoryPayload,
): Promise<Category> {
  const response = await api.post("/categories", payload);
  return unwrap(response.data);
}

// UPDATE: Update category
export async function updateCategory(
  id: number,
  payload: CategoryPayload,
): Promise<Category> {
  try {
    console.log("Update category ID:", id);
    console.log("Update category payload:", payload);

    const response = await api.put<Category | ApiResponse<Category>>(
      `/categories/${id}`,
      payload,
    );

    console.log("Update response:", response.data);

    return unwrap(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API URL:", error.config?.url);
      console.error("API method:", error.config?.method);
      console.error("Request data:", error.config?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }

    throw error;
  }
}

// DELETE: Delete category
export async function deleteCategory(id: number): Promise<void> {
  await api.delete(`/categories/${id}`);
}
