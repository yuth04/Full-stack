
"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Category, CategoryPayload } from "@/types/categories";

type EditCategoryDialogProps = {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    id: number,
    payload: CategoryPayload
  ) => Promise<void>;
};

export function EditCategoryDialog({
  category,
  open,
  onOpenChange,
  onSubmit,
}: EditCategoryDialogProps) {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(
    category.description ?? ""
  );
  const [isActive, setIsActive] = useState(
    category.isActive ? "Active" : "Inactive"
  );

  const [loading, setLoading] = useState(false);

  // Update form when selected category changes
  useEffect(() => {
    setName(category.name);
    setDescription(category.description ?? "");
    setIsActive(category.isActive ? "Active" : "Inactive");
  }, [category]);

  const resetForm = () => {
    setName(category.name);
    setDescription(category.description ?? "");
    setIsActive(category.isActive ? "Active" : "Inactive");
  };

  const handleOpenChange = (value: boolean) => {
    if (loading) return;

    onOpenChange(value);

    if (!value) {
      resetForm();
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) return;

    const payload: CategoryPayload = {
      name: name.trim(),
      description: description.trim(),
      isActive: isActive === "Active",
    };

    try {
      setLoading(true);

      await onSubmit(category.id, payload);

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Edit Category
          </DialogTitle>

          <DialogDescription>
            Update the category information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Category Name *
            </label>

            <Input
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <Textarea
              placeholder="Write category description..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Status
            </label>

            <Select
              value={isActive}
              onValueChange={(value) =>
                setIsActive(value ?? "Active")
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Active">
                  Active
                </SelectItem>

                <SelectItem value="Inactive">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
