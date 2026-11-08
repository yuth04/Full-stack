
"use client";

import { useState } from "react";
import { ClipboardList, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";

const history = [
  {
    id: "ADJ-001",
    product: "MacBook Pro 14",
    sku: "LAP-001",
    type: "Increase",
    quantity: 5,
    reason: "Physical stock count",
    date: "Nov 07, 2026",
    user: "Admin",
  },
  {
    id: "ADJ-002",
    product: "Dell XPS 15",
    sku: "LAP-002",
    type: "Decrease",
    quantity: 2,
    reason: "Damaged products",
    date: "Nov 06, 2026",
    user: "Admin",
  },
];

export default function StockAdjustmentsPage() {
  const [product, setProduct] = useState("");
  const [type, setType] = useState("increase");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [search, setSearch] = useState("");

  const filtered = history.filter((item) =>
    `${item.id} ${item.product} ${item.sku}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleAdjustment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Connect this form to your stock adjustment API.
    console.log({ product, type, quantity: Number(quantity), reason });

  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stock Adjustments</h1>
        <p className="text-sm text-muted-foreground">
          Manually correct inventory quantities and track adjustment history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plus className="h-5 w-5" />
            Create Stock Adjustment
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleAdjustment} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <Label>Product SKU</Label>
                <Select value={product} onValueChange={setProduct} required>
                  <SelectTrigger >
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent className={" w-auto"} >
                    <SelectItem value="LAP-001">LAP-001 - MacBook Pro 14</SelectItem>
                    <SelectItem value="LAP-002">LAP-002 - Dell XPS 15</SelectItem>
                    <SelectItem value="AUD-001">AUD-001 - Sony Headphones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Adjustment Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase">Increase Stock</SelectItem>
                    <SelectItem value="decrease">Decrease Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Select value={reason} onValueChange={setReason} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physical stock count">Physical stock count</SelectItem>
                    <SelectItem value="Damaged products">Damaged products</SelectItem>
                    <SelectItem value="Lost products">Lost products</SelectItem>
                    <SelectItem value="Data correction">Data correction</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Additional adjustment details..." />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={!product || !quantity || Number(quantity) <= 0 || !reason}>
                Create Adjustment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="h-5 w-5" />
            Adjustment History
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search adjustments..."
              className="pl-9"
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Adjustment ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Adjusted By</TableHead>
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
                      <Badge variant={item.type === "Increase" ? "default" : "destructive"}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.type === "Increase" ? "+" : "-"}{item.quantity}
                    </TableCell>
                    <TableCell>{item.reason}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No adjustments found.
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
