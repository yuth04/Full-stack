"use client";

import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/data/pos";
import { formatPrice } from "@/utils/pos";


type Props = {
  product: Product;
  quantityInCart: number;
  onAdd: () => void;
};

export function ProductCard({ product, quantityInCart, onAdd }: Props) {
  const Icon = product.icon;
  const outOfStock = product.stock === 0;
  const unavailable = outOfStock || quantityInCart >= product.stock;

  return (
    <Card className="group overflow-hidden py-0 shadow-none transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <CardContent className="flex h-full flex-col gap-4 p-3.5 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex size-11 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
            <Icon className="size-5 text-muted-foreground group-hover:text-primary" />
          </div>

          {quantityInCart > 0 ? (
            <Badge className="rounded-full">{quantityInCart} in cart</Badge>
          ) : (
            <Badge
              variant="outline"
              className="hidden rounded-full sm:inline-flex"
            >
              {product.category}
            </Badge>
          )}
        </div>

        <div className="min-h-[60px] flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            {product.productName}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.sku}</p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <p className="text-base font-bold tracking-tight">
            {formatPrice(product.price)}
          </p>

          <p
            className={`text-xs ${
              product.stock <= 5
                ? "font-medium text-amber-600"
                : "text-muted-foreground"
            }`}
          >
            {product.stock} left
          </p>
        </div>

        <Button
          size="sm"
          className="h-9 w-full rounded-lg"
          disabled={unavailable}
          onClick={onAdd}
        >
          <Plus className="size-4" />
          {outOfStock ? "Out of stock" : unavailable ? "Max in cart" : "Add to cart"}
        </Button>
      </CardContent>
    </Card>
  );
}