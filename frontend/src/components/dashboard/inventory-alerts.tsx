
import Link from "next/link";
import { ArrowRight, CircleAlert, Package } from "lucide-react";
import { lowStockProducts } from "./dashboard-data";

export default function InventoryAlerts() {
  return (
    <section className="min-w-0 rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 border-b p-5">
        <div>
          <h3 className="font-semibold">Inventory alerts</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Products that need attention
          </p>
        </div>
        <CircleAlert className="size-5 text-amber-500" />
      </div>

      <div className="divide-y">
        {lowStockProducts.map((product) => (
          <div key={product.sku} className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2.5">
              <Package className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {product.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                SKU: {product.sku}
              </p>
            </div>

            <div className="text-right">
              <p
                className={`text-sm font-semibold ${
                  product.stock === 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {product.stock === 0
                  ? "Out of stock"
                  : `${product.stock} left`}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Min. {product.minimum}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <Link
          href="/inventory"
          className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted"
        >
          Manage inventory
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
