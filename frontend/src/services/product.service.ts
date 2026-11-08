import api from "@/lib/axois";
import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<ApiResponse<any[]> | any[]>("/products");

  const result = response.data;
  const products = Array.isArray(result) ? result : result.data;
  console.log("products", products);
  if (!Array.isArray(products)) {
    throw new Error("Invalid products API response.");
  }
  return products.map((product) => ({
    id: Number(product.id),
    productName: product.productName,
    sku: product.sku,
    description: product.description ?? "",
    image: product.image ?? null,
    category: product.Category?.name ?? null,
    brand: product.Brand?.name ?? null,
    price: Number(product.price),
    qty: Number(product.qty),
    isActive: Boolean(product.isActive),
  }));
}
// create product
export async function createProduct(formData: FormData) {
  const response = await api.post("/products", formData);

  return response.data;
}
// update product
export const updateProduct = async (id: number, formData: FormData) => {
  const { data } = await api.put(`/products/${id}`, formData);
  return data;
};
// delete product
export async function deleteProduct(productId: number) {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
}
