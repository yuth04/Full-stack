
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Truck,
  Users,
  Package,
  Wallet,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Building2,
  Download,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Supplier = {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  totalPurchases: number;
  totalAmount: number;
  status: "Active" | "Inactive";
  createdAt: string;
};

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Tech Distribution Co.",
    contactPerson: "Sok Dara",
    email: "dara@techdistribution.com",
    phone: "+855 12 345 678",
    address: "Phnom Penh, Cambodia",
    category: "Computers & Laptops",
    totalPurchases: 24,
    totalAmount: 12500,
    status: "Active",
    createdAt: "2026-01-15",
  },
  {
    id: 2,
    name: "Global Electronics",
    contactPerson: "Chan Vicheka",
    email: "vicheka@globalelectronics.com",
    phone: "+855 10 234 567",
    address: "Sen Sok, Phnom Penh",
    category: "Electronics",
    totalPurchases: 18,
    totalAmount: 8400,
    status: "Active",
    createdAt: "2026-02-10",
  },
  {
    id: 3,
    name: "Digital Solutions Ltd.",
    contactPerson: "Kim Sothea",
    email: "sothea@digitalsolutions.com",
    phone: "+855 15 456 789",
    address: "Chamkarmon, Phnom Penh",
    category: "Computer Accessories",
    totalPurchases: 15,
    totalAmount: 15800,
    status: "Active",
    createdAt: "2026-03-05",
  },
  {
    id: 4,
    name: "Smart Devices Cambodia",
    contactPerson: "Heng Pisey",
    email: "pisey@smartdevices.com",
    phone: "+855 96 123 4567",
    address: "Toul Kork, Phnom Penh",
    category: "Mobile Devices",
    totalPurchases: 10,
    totalAmount: 6900,
    status: "Inactive",
    createdAt: "2026-04-12",
  },
  {
    id: 5,
    name: "Phnom Penh Computer Supply",
    contactPerson: "Lim Rithy",
    email: "rithy@ppcsupply.com",
    phone: "+855 11 567 890",
    address: "Daun Penh, Phnom Penh",
    category: "Computers & Laptops",
    totalPurchases: 12,
    totalAmount: 5200,
    status: "Active",
    createdAt: "2026-05-20",
  },
  {
    id: 6,
    name: "Cambodia Tech Imports",
    contactPerson: "Chea Vibol",
    email: "vibol@techimports.com",
    phone: "+855 17 678 901",
    address: "Mean Chey, Phnom Penh",
    category: "Networking Equipment",
    totalPurchases: 8,
    totalAmount: 3800,
    status: "Inactive",
    createdAt: "2026-06-08",
  },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

const emptyForm = {
  name: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
  category: "",
  status: "Active" as Supplier["status"],
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [viewSupplier, setViewSupplier] = useState<Supplier | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredSuppliers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(keyword) ||
        supplier.contactPerson.toLowerCase().includes(keyword) ||
        supplier.email.toLowerCase().includes(keyword) ||
        supplier.phone.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "All" || supplier.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, statusFilter]);

  const activeCount = suppliers.filter(
    (supplier) => supplier.status === "Active",
  ).length;

  const totalPurchases = suppliers.reduce(
    (sum, supplier) => sum + supplier.totalPurchases,
    0,
  );

  const totalAmount = suppliers.reduce(
    (sum, supplier) => sum + supplier.totalAmount,
    0,
  );

  const openCreateDialog = () => {
    setSelectedSupplier(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setForm({
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      category: supplier.category,
      status: supplier.status,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Supplier name is required.");
      return;
    }

    if (!form.contactPerson.trim()) {
      toast.error("Contact person is required.");
      return;
    }

    if (!form.phone.trim()) {
      toast.error("Phone number is required.");
      return;
    }

    if (selectedSupplier) {
      setSuppliers((current) =>
        current.map((supplier) =>
          supplier.id === selectedSupplier.id
            ? { ...supplier, ...form }
            : supplier,
        ),
      );
      toast.success("Supplier updated successfully.");
    } else {
      const newSupplier: Supplier = {
        id: Math.max(0, ...suppliers.map((supplier) => supplier.id)) + 1,
        ...form,
        totalPurchases: 0,
        totalAmount: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setSuppliers((current) => [newSupplier, ...current]);
      toast.success("Supplier created successfully.");
    }

    setDialogOpen(false);
    setForm(emptyForm);
    setSelectedSupplier(null);
  };

  const confirmDelete = () => {
    if (!selectedSupplier) return;

    setSuppliers((current) =>
      current.filter((supplier) => supplier.id !== selectedSupplier.id),
    );

    toast.success("Supplier deleted successfully.");
    setDeleteOpen(false);
    setSelectedSupplier(null);
  };

  const exportSuppliers = () => {
    const headers = [
      "Supplier",
      "Contact Person",
      "Email",
      "Phone",
      "Address",
      "Category",
      "Status",
    ];

    const rows = filteredSuppliers.map((supplier) => [
      supplier.name,
      supplier.contactPerson,
      supplier.email,
      supplier.phone,
      supplier.address,
      supplier.category,
      supplier.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "suppliers.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Suppliers exported successfully.");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className=" text-2xl font-bold tracking-tight">
            Suppliers
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your suppliers and track purchasing relationships.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportSuppliers}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl shadow-none">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Suppliers</p>
              <h2 className="mt-2 text-2xl font-bold">{suppliers.length}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Registered suppliers
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-none">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Active Suppliers</p>
              <h2 className="mt-2 text-2xl font-bold">{activeCount}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Currently available
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950">
              <Truck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-none">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Purchases</p>
              <h2 className="mt-2 text-2xl font-bold">{totalPurchases}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Purchase transactions
              </p>
            </div>
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950">
              <Package className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-none">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Purchase Value</p>
              <h2 className="mt-2 text-2xl font-bold">
                {formatCurrency(totalAmount)}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Total supplier purchases
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950">
              <Wallet className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supplier Table */}
      <Card className="overflow-hidden rounded-xl shadow-none">
        <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">All Suppliers</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredSuppliers.length} suppliers found
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-sm">
            <thead className="bg-muted/40">
              <tr className="border-b text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Supplier</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Purchases</th>
                <th className="px-5 py-3 font-medium">Total Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                        {supplier.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          SUP-{String(supplier.id).padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium">{supplier.contactPerson}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {supplier.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant="secondary" className="font-normal">
                      {supplier.category || "Uncategorized"}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {supplier.totalPurchases}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {formatCurrency(supplier.totalAmount)}
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant="outline"
                      className={
                        supplier.status === "Active"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
                          : "border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                      }
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          supplier.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-gray-400"
                        }`}
                      />
                      {supplier.status}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setViewSupplier(supplier)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => openEditDialog(supplier)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Supplier
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setSelectedSupplier(supplier);
                            setDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Supplier
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}

              {filteredSuppliers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="mt-3 font-medium">No suppliers found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Supplier Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedSupplier ? "Edit Supplier" : "Add New Supplier"}
            </DialogTitle>
            <DialogDescription>
              Enter the supplier information below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-3 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Supplier Name *</Label>
              <Input
                placeholder="e.g. Tech Distribution Co."
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Contact Person *</Label>
              <Input
                placeholder="Contact person name"
                value={form.contactPerson}
                onChange={(event) =>
                  setForm({ ...form, contactPerson: event.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                placeholder="+855 12 345 678"
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="supplier@example.com"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setForm({ ...form, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computers & Laptops">
                    Computers & Laptops
                  </SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Computer Accessories">
                    Computer Accessories
                  </SelectItem>
                  <SelectItem value="Mobile Devices">Mobile Devices</SelectItem>
                  <SelectItem value="Networking Equipment">
                    Networking Equipment
                  </SelectItem>
                  <SelectItem value="Office Equipment">
                    Office Equipment
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(value: Supplier["status"]) =>
                  setForm({ ...form, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Address</Label>
              <Textarea
                placeholder="Supplier address..."
                rows={3}
                value={form.address}
                onChange={(event) =>
                  setForm({ ...form, address: event.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {selectedSupplier ? "Save Changes" : "Create Supplier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Supplier Details Dialog */}
      <Dialog
        open={!!viewSupplier}
        onOpenChange={(open) => !open && setViewSupplier(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Supplier Details</DialogTitle>
            <DialogDescription>
              Contact and purchasing information.
            </DialogDescription>
          </DialogHeader>

          {viewSupplier && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
                  {viewSupplier.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold">{viewSupplier.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    SUP-{String(viewSupplier.id).padStart(3, "0")}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-1"
                  >
                    {viewSupplier.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border p-4 text-sm">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {viewSupplier.contactPerson}
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {viewSupplier.email || "No email"}
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {viewSupplier.phone}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {viewSupplier.address || "No address"}
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  {viewSupplier.category || "Uncategorized"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">
                    Total Purchases
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {viewSupplier.totalPurchases}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">
                    Total Amount
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {formatCurrency(viewSupplier.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewSupplier(null)}
            >
              Close
            </Button>
            {viewSupplier && (
              <Button
                onClick={() => {
                  openEditDialog(viewSupplier);
                  setViewSupplier(null);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Supplier
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Supplier?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedSupplier?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Supplier
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
