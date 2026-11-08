export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  product?: {
    id: number;
    productName: string;
    price: number;
    brand_id: number;
  }[];
}
export interface BrandInput {
  name: string;
  logo?: string | null;
  isActive?: boolean;
}
export interface BrandResponse {
  succes: boolean;
  message: string;
  data: Brand;
}
export interface BrandsResponse {
  success: boolean;
  message: string;
  data: Brand[];
}
