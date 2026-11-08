import type { Brand } from "./brand";
import type { Category } from "./categories";

export type Product = {
  id: number;
  productName: string;
  sku?: string | null;
  description: string | null;
  price: number;
  qty: number;
  category_id: number | null;
  category: string | null;
  cost: number;
  stock: any;
  brand_id: number | null;
  brand: string | null;

  image: string | null;
  isActive: boolean;

  // Optional Sequelize associations
  Category?: Category | null;
  Brand?: Brand | null;
};

export type AddProductDialogProps = {
  categories: Category[];
  brands: Brand[];
  onSubmit: (formData: FormData) => Promise<unknown>;
  product?: Product | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isSubmitting?: boolean;
};
