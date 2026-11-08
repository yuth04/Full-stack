
import Link from "next/link";
import { Plus } from "lucide-react";

interface OrdersHeaderProps {
  title: string;
  description: string;
}

export default function OrdersHeader({
  title,
  description,
}: OrdersHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <Link
        href="/orders/new"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" />
        Create Order
      </Link>
    </div>
  );
}
