"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
  Boxes,
  Package,
  PackageX,
  Search,
  TrendingUp,
  Warehouse,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const stockStats = [
  {
    title: "Total Stock Value",
    value: "$125,450.00",
    description: "Current inventory valuation",
    icon: TrendingUp,
  },
  {
    title: "Total Stock Units",
    value: "1,284",
    description: "Across all products",
    icon: Boxes,
  },
  {
    title: "Low Stock Items",
    value: "18",
    description: "Products need restocking",
    icon: AlertTriangle,
  },
  {
    title: "Out of Stock",
    value: "5",
    description: "Products unavailable",
    icon: PackageX,
  },
];

const stockItems = [
  {
    id: 1,
    sku: "LAP-001",
    name: "MacBook Pro 14",
    category: "Laptop",
    stock: 12,
    minStock: 5,
    price: 1999,
    value: 23988,
    status: "In Stock",
  },
  {
    id: 2,
    sku: "LAP-002",
    name: "Dell XPS 15",
    category: "Laptop",
    stock: 3,
    minStock: 5,
    price: 1499,
    value: 4497,
    status: "Low Stock",
  },
  {
    id: 3,
    sku: "AUD-001",
    name: "Sony WH-1000XM5",
    category: "Accessories",
    stock: 25,
    minStock: 5,
    price: 349,
    value: 8725,
    status: "In Stock",
  },
  {
    id: 4,
    sku: "MOU-001",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    stock: 0,
    minStock: 5,
    price: 99,
    value: 0,
    status: "Out of Stock",
  },
  {
    id: 5,
    sku: "LAP-003",
    name: "ASUS ROG Zephyrus G14",
    category: "Laptop",
    stock: 2,
    minStock: 5,
    price: 1599,
    value: 3198,
    status: "Low Stock",
  },
];

const movements = [
  {
    id: 1,
    product: "MacBook Pro 14",
    sku: "LAP-001",
    type: "Stock In",
    quantity: 10,
    date: "Nov 07, 2026",
  },
  {
    id: 2,
    product: "Dell XPS 15",
    sku: "LAP-002",
    type: "Stock Out",
    quantity: 2,
    date: "Nov 06, 2026",
  },
  {
    id: 3,
    product: "Sony WH-1000XM5",
    sku: "AUD-001",
    type: "Stock In",
    quantity: 15,
    date: "Nov 05, 2026",
  },
];

export default function StockOverviewPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Overview</h1>
          <p className="text-sm text-muted-foreground">
            Monitor your inventory, stock levels, and movements.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            Stock In
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stockStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center justify-between p-5">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stock Level + Alerts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Warehouse className="h-5 w-5" />
              Inventory Health
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>In Stock</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} />
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Low Stock</span>
                <span className="font-medium">12%</span>
              </div>
              <Progress value={12} />
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Out of Stock</span>
                <span className="font-medium">3%</span>
              </div>
              <Progress value={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Stock Alerts
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {stockItems
              .filter((item) => item.status !== "In Stock")
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sku}</p>
                  </div>

                  <Badge
                    variant={
                      item.status === "Out of Stock"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {item.stock} left
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Stock Inventory */}
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-base">Inventory Details</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Current stock levels for all products.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 sm:w-[220px]"
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="sm:w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Laptop">Laptop</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Stock Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {stockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.sku}
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <span className="font-medium">{item.stock}</span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        / {item.minStock} min
                      </span>
                    </TableCell>
                    <TableCell>${item.price.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">
                      ${item.value.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "In Stock"
                            ? "default"
                            : item.status === "Low Stock"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Stock Movements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Stock Movements</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Movement Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell className="font-medium">
                      {movement.product}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {movement.sku}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          movement.type === "Stock In" ? "default" : "secondary"
                        }
                      >
                        {movement.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          movement.type === "Stock In"
                            ? "font-medium text-green-600"
                            : "font-medium text-orange-600"
                        }
                      >
                        {movement.type === "Stock In" ? "+" : "-"}
                        {movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell>{movement.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
