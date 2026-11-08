"use client";

import { Package } from "lucide-react";
import { ProductFilters } from "./product-filter";
import { Sale } from "@/hooks/pos/useNewSale";
import { ProductCard } from "./product-cart";

export function ProductCatalog({ sale }: { sale: Sale }) {
  const { filteredProducts, cart } = sale;

  return (
    <div className="min-w-0 space-y-6">
      <ProductFilters
        search={sale.search}
        onSearchChange={sale.setSearch}
        category={sale.category}
        onCategoryChange={sale.setCategory}
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Available Products
          </h2>
          <p className="text-sm text-muted-foreground">
            Select a product to add it to your cart.
          </p>
        </div>

        <span className="text-xs text-muted-foreground">
          {filteredProducts.length} products
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {filteredProducts.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={
              cart.find((item) => item.id === product.id)?.quantity ?? 0
            }
            onAdd={() => sale.addToCart(product)}
          />
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed p-12 text-center">
            <Package className="mx-auto mb-3 size-9 text-muted-foreground" />
            <p className="font-semibold">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another search or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
