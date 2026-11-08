
import { useEffect, useMemo, useState } from "react";

import { buildImageUrl } from "@/lib/image";
import type { Product } from "@/types/product";
import type { Category } from "@/types/categories";
import type { Brand } from "@/types/brand";
import { useImagePreview } from "@/hooks/use-image-preview";

type Options = {
  product: Product | null;
  categories: Category[];
  brands: Brand[];
  onSubmit: (formData: FormData) => Promise<unknown>;
  onAdded?: () => void;
  isSubmitting?: boolean;
};

export function useProductForm({
  product,
  categories,
  brands,
  onSubmit,
  onAdded,
  isSubmitting = false,
}: Options) {
  const isEdit = !!product;

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("0");

  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  const [isActive, setIsActive] = useState("Active");
  const [image, setImage] = useState<File | null>(null);

  const preview = useImagePreview(image);

  // Category options
  const categoryItems = useMemo(
    () =>
      categories.map((category) => ({
        value: String(category.id),
        label: category.name,
      })),
    [categories],
  );

  // Brand options
  const brandItems = useMemo(
    () =>
      brands.map((brand) => ({
        value: String(brand.id),
        label: brand.name,
      })),
    [brands],
  );

  // Image preview
  const displayImage = preview ?? buildImageUrl(product?.image);

  // Reset form
  const resetForm = () => {
    setProductName("");
    setDescription("");
    setPrice("");
    setQty("0");
    setCategoryId("");
    setBrandId("");
    setIsActive("Active");
    setImage(null);
  };

  // Load existing product when editing
  useEffect(() => {
    if (!product) {
      resetForm();
      return;
    }

    setProductName(product.productName ?? "");
    setDescription(product.description ?? "");
    setPrice(String(product.price ?? ""));
    setQty(String(product.qty ?? "0"));

    setCategoryId(
      product.category_id != null
        ? String(product.category_id)
        : "",
    );

    setBrandId(
      product.brand_id != null
        ? String(product.brand_id)
        : "",
    );

    setIsActive(product.isActive ? "Active" : "Inactive");
    setImage(null);
  }, [product]);

  // Resolve category ID if API only provides its name
  useEffect(() => {
    if (!product || product.category_id != null || categoryId) {
      return;
    }

    const categoryName =
      product.Category?.name ?? product.category;

    const matched = categories.find(
      (category) => category.name === categoryName,
    );

    if (matched) {
      setCategoryId(String(matched.id));
    }
  }, [product, categories, categoryId]);

  // Resolve brand ID if API only provides its name
  useEffect(() => {
    if (!product || product.brand_id != null || brandId) {
      return;
    }

    const brandName = product.Brand?.name ?? product.brand;

    const matched = brands.find(
      (brand) => brand.name === brandName,
    );

    if (matched) {
      setBrandId(String(matched.id));
    }
  }, [product, brands, brandId]);

  // Submit form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData();

    formData.append("productName", productName.trim());
    formData.append("description", description);
    formData.append("price", price);
    formData.append("qty", qty);

    formData.append("category_id", categoryId);
    formData.append("brand_id", brandId);

    formData.append(
      "isActive",
      String(isActive === "Active"),
    );

    if (image) {
      formData.append("image", image);
    }

    await onSubmit(formData);

    // Reset only after successful creation
    if (!isEdit) {
      resetForm();
      onAdded?.();
    }
  };

  return {
    isEdit,
    loading: isSubmitting,

    productName,
    setProductName,

    description,
    setDescription,

    price,
    setPrice,

    qty,
    setQty,

    categoryId,
    setCategoryId,

    brandId,
    setBrandId,

    isActive,
    setIsActive,

    image,
    setImage,

    displayImage,

    categoryItems,
    brandItems,

    handleSubmit,
    resetForm,
  };
}
