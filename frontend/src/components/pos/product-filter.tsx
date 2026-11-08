"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/pos";


type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
};

export function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: Props) {
  return (
    <Card className="shadow-none">
      <CardContent className="space-y-4 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search product name or SKU..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 pl-9"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={category === item ? "default" : "outline"}
              className="shrink-0 rounded-full px-4"
              onClick={() => onCategoryChange(item)}
            >
              {item === "all" ? "All Products" : item}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}