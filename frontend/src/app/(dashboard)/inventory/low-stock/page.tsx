
"use client";

import { useState } from "react";
import { AlertTriangle, Search, PackagePlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";

const products = [
  { id: 1, sku: "LAP-002", name: "Dell XPS 15", category: "Laptop", stock: 3, minStock: 5 },
  { id: 2, sku: "LAP-003", name: "ASUS ROG Zephyrus G14", category: "Laptop", stock: 2, minStock: 5 },
  { id: 3, sku: "MOU-001", name: "Logitech MX Master 3S", category: "Accessories", stock: 0, minStock: 5 },
  { id: 4, sku: "AUD-002", name: "Sony WF-1000XM5", category: "Accessories", stock: 4, minStock: 10 },
];

export default function LowStockPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    `${p.name} ${p.sku}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Low Stock</h1>
        <p className="text-sm text-muted-foreground">
          Monitor products that need replenishment.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Low Stock Items</p>
            <p className="mt-2 text-2xl font-bold">18</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <p className="mt-2 text-2xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Need Reordering</p>
            <p className="mt-2 text-2xl font-bold">23</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Products Requiring Attention
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Products at or below their minimum stock level.
            </p>
          </div>
          <Button>
            <PackagePlus className="mr-2 h-4 w-4" />
            Create Purchase Order
          </Button>
        </CardHeader>

        <CardContent>
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product or SKU..."
              className="pl-9"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Minimum Stock</TableHead>
                  <TableHead>Shortage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.sku}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>{p.minStock}</TableCell>
                    <TableCell className="font-medium text-destructive">
                      {p.minStock - p.stock}
                    </TableCell>
                    <TableCell>
                      <Badge variant={p.stock === 0 ? "destructive" : "secondary"}>
                        {p.stock === 0 ? "Out of Stock" : "Low Stock"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
