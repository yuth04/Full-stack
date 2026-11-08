
"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";

const movements = [
  { id: "MOV-001", product: "MacBook Pro 14", sku: "LAP-001", type: "Stock In", quantity: 10, reference: "PO-001", date: "Nov 07, 2026", user: "Admin" },
  { id: "MOV-002", product: "Dell XPS 15", sku: "LAP-002", type: "Stock Out", quantity: 2, reference: "ORD-001", date: "Nov 07, 2026", user: "Admin" },
  { id: "MOV-003", product: "Sony Headphones", sku: "AUD-001", type: "Adjustment", quantity: -2, reference: "ADJ-001", date: "Nov 06, 2026", user: "Admin" },
  { id: "MOV-004", product: "Logitech Mouse", sku: "MOU-001", type: "Return", quantity: 1, reference: "RET-001", date: "Nov 05, 2026", user: "Admin" },
];

export default function StockMovementsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const filtered = movements.filter((item) => {
    const matchesSearch =
      `${item.id} ${item.product} ${item.sku} ${item.reference}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesType = type === "all" || item.type === type;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Stock Movements</h1>
          <p className="text-sm text-muted-foreground">
            Track all inventory transactions and stock changes.
          </p>
        </div>
        <Button variant="outline">
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Stock In</p>
              <ArrowDownToLine className="h-5 w-5 text-green-600" />
            </div>
            <p className="mt-2 text-2xl font-bold">125</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Stock Out</p>
              <ArrowUpFromLine className="h-5 w-5 text-orange-600" />
            </div>
            <p className="mt-2 text-2xl font-bold">86</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Movements</p>
            <p className="mt-2 text-2xl font-bold">211</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Movement History</CardTitle>
          <p className="text-sm text-muted-foreground">
            A detailed record of all inventory changes.
          </p>
        </CardHeader>

        <CardContent>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search product, SKU or reference..."
                className="pl-9"
              />
            </div>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Movement type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Movements</SelectItem>
                <SelectItem value="Stock In">Stock In</SelectItem>
                <SelectItem value="Stock Out">Stock Out</SelectItem>
                <SelectItem value="Adjustment">Adjustment</SelectItem>
                <SelectItem value="Return">Return</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Movement ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      {item.product}
                      <p className="text-xs text-muted-foreground">{item.sku}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.type === "Stock In" || item.type === "Return" ? "default" : "secondary"}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={item.quantity > 0 ? "font-medium text-green-600" : "font-medium text-destructive"}>
                        {item.quantity > 0 ? "+" : ""}{item.quantity}
                      </span>
                    </TableCell>
                    <TableCell>{item.reference}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No stock movements found.
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
