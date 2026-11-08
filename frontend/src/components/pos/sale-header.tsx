"use client";

import { useRouter } from "next/navigation";
import { PauseCircle, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SaleHeader({ totalItems }: { totalItems: number }) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            New Sale
          </h1>
          <Badge variant="secondary" className="rounded-full px-3">
            POS
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Create a new transaction and process customer payments.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => router.push("/pos/held-orders")}
        >
          <PauseCircle className="size-4" />
          Held Orders
        </Button>

        <Badge variant="outline" className="hidden h-9 gap-2 px-3 sm:flex">
          <ShoppingCart className="size-4" />
          {totalItems} items
        </Badge>
      </div>
    </div>
  );
}