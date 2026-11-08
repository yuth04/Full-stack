
import api from "../lib/axois";
import type {
  Brand,
  BrandInput,
  BrandResponse,
  BrandsResponse,
} from "@/types/brand";

const API_URL = "/brands";

// GET ALL BRANDS
export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get<BrandsResponse>(API_URL);
  return response.data.data;
};

// GET BRAND BY ID
export const getBrandById = async (id: number): Promise<Brand> => {
  const response = await api.get<BrandResponse>(`${API_URL}/${id}`);
  return response.data.data;
};

// CREATE BRAND
export const createBrand = async (
  data: BrandInput
): Promise<Brand> => {
  const response = await api.post<BrandResponse>(API_URL, data);
  return response.data.data;
};

// UPDATE BRAND
export const updateBrand = async (
  id: number,
  data: Partial<BrandInput>
): Promise<Brand> => {
  const response = await api.put<BrandResponse>(
    `${API_URL}/${id}`,
    data
  );
  return response.data.data;
};

// DELETE BRAND
export const deleteBrand = async (id: number): Promise<void> => {
  await api.delete(`${API_URL}/${id}`);
};
