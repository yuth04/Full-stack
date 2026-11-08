"use client";

import {
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Truck,
} from "lucide-react";

import { useAddPurchase } from "./hooks/usePurchase";
import type { NewPurchaseData } from "@/types/purchase";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AddPurchaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: NewPurchaseData) => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export function AddPurchaseDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddPurchaseDialogProps) {
  const {
    supplierId,
    setSupplierId,
    reference,
    setReference,
    date,
    setDate,
    expectedDate,
    setExpectedDate,
    paymentMethod,
    setPaymentMethod,
    shipping,
    setShipping,
    discount,
    setDiscount,
    paid,
    setPaid,
    notes,
    setNotes,
    search,
    setSearch,
    items,
    suppliers,
    filteredProducts,
    subtotal,
    paidAmount,
    total,
    due,
    addProduct,
    updateQuantity,
    updateCost,
    removeProduct,
    resetForm,
    handleSubmit,
  } = useAddPurchase({
    onSubmit,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);

        if (!value) {
          resetForm();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="rounded-lg bg-primary/10 p-2 text-primary">
              <ShoppingCart className="size-5" />
            </span>
            Create Purchase
          </DialogTitle>

          <DialogDescription>
            Create a purchase order and add products from your suppliers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Purchase information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="size-4 text-muted-foreground" />
              <h3 className="font-semibold">Purchase Information</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Supplier *</Label>

                <Select value={supplierId} onValueChange={setSupplierId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>

                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={String(supplier.id)}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Reference Number</Label>
                <Input
                  placeholder="e.g. REF-001"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>

                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Credit">Credit</SelectItem>
                    <SelectItem value="KHQR">KHQR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Purchase Date *</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Expected Delivery</Label>
                <Input
                  type="date"
                  value={expectedDate}
                  min={date}
                  onChange={(e) => setExpectedDate(e.target.value)}
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Products */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-muted-foreground" />
              <h3 className="font-semibold">Purchase Products</h3>
              <Badge variant="secondary">{items.length} products</Badge>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                className="pl-9"
                placeholder="Search product name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {search.trim() && (
              <div className="max-h-48 overflow-y-auto rounded-lg border">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => addProduct(product)}
                      className="flex w-full items-center justify-between gap-3 border-b p-3 text-left last:border-0 hover:bg-muted/50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.sku} · Current stock: {product.stock}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-sm font-semibold">
                          {formatCurrency(product.cost)}
                        </span>
                        <Plus className="size-4 text-primary" />
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="p-4 text-center text-sm text-muted-foreground">
                    No products found.
                  </p>
                )}
              </div>
            )}

            {/* Selected product table */}
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[650px] text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Product</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Unit Cost
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Subtotal
                    </th>
                    <th className="w-12 px-4 py-3" />
                  </tr>
                </thead>

                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center">
                        <Package className="mx-auto mb-2 size-8 text-muted-foreground/50" />
                        <p className="font-medium">No products added</p>
                        <p className="text-xs text-muted-foreground">
                          Search and select products above.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.productId} className="border-t">
                        <td className="px-4 py-3">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.sku}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-28"
                            value={item.cost}
                            onChange={(e) =>
                              updateCost(item.productId, Number(e.target.value))
                            }
                          />
                        </td>

                        <td className="px-4 py-3">
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            className="w-20"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.productId,
                                Number(e.target.value),
                              )
                            }
                          />
                        </td>

                        <td className="px-4 py-3 text-right font-medium">
                          {formatCurrency(item.cost * item.quantity)}
                        </td>

                        <td className="px-4 py-3">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="text-destructive"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeProduct(item.productId)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <Separator />

          {/* Notes and summary */}
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Additional Information</h3>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add purchase notes..."
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4 rounded-xl border bg-muted/20 p-4">
              <h3 className="font-semibold">Purchase Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="purchase-shipping">Shipping</Label>
                  <Input
                    id="purchase-shipping"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-32"
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="purchase-discount">Discount</Label>
                  <Input
                    id="purchase-discount"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-32"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>

                <Separator />

                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="purchase-paid">Amount Paid</Label>
                  <Input
                    id="purchase-paid"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-32"
                    value={paid}
                    onChange={(e) => setPaid(e.target.value)}
                  />
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Amount</span>
                  <span className="font-semibold text-destructive">
                    {formatCurrency(due)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>

                  <Badge
                    variant={
                      due === 0
                        ? "default"
                        : paidAmount > 0
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {due === 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid"}
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleSubmit}>
            <Plus className="mr-2 size-4" />
            Create Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
