export type Category = {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  Products?: {
    id: number;
    productName: string;
    price: number;
    category_id: number;
  }[];
};

export type CategoryPayload = {
  name: string;
  description: string;
  isActive: boolean;
};