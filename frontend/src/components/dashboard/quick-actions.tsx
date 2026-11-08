
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Plus,
  ShoppingCart,
  TrendingUp,
  PackageSearch,
} from "lucide-react";

const actions = [
  {
    title: "Open POS",
    description: "Start a new sale",
    href: "/pos",
    icon: ShoppingCart,
  },
  {
    title: "Add Product",
    description: "Create a product",
    href: "/products?action=new",
    icon: Plus,
  },
  {
    title: "Manage Inventory",
    description: "Check stock levels",
    href: "/inventory",
    icon: Boxes,
  },
  {
    title: "Track Orders",
    description: "Monitor order status and progress",
    href: "/orders",
    icon: PackageSearch,
  },
  {
    title: "Sales Reports",
    description: "Review performance",
    href: "/sales-reports",
    icon: TrendingUp,
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-4">
        <h3 className="font-semibold">Quick actions</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Common tasks for daily store operations
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Icon className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{action.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>

              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
