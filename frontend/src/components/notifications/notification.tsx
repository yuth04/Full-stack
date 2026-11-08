"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Info,
  PackagePlus,
  PackageX,
  Tag,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Types & static data                                                        */
/* -------------------------------------------------------------------------- */

type NotificationType =
  | "low_stock"
  | "out_of_stock"
  | "product_added"
  | "price_changed"
  | "brand_updated"
  | "system";

type NotificationGroup = "Today" | "Yesterday" | "Earlier";

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  group: NotificationGroup;
  read: boolean;
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: "out_of_stock",
    title: "Wireless Mouse is out of stock",
    message: "Logitech M185 reached 0 units. Restock to keep it available.",
    time: "5 min ago",
    group: "Today",
    read: false,
  },
  {
    id: 2,
    type: "low_stock",
    title: "Low stock: Mechanical Keyboard",
    message: "Only 4 units left, below your minimum of 10.",
    time: "42 min ago",
    group: "Today",
    read: false,
  },
  {
    id: 3,
    type: "product_added",
    title: "New product added",
    message: "USB-C Hub 7-in-1 was added to Accessories.",
    time: "2 hours ago",
    group: "Today",
    read: false,
  },
  {
    id: 4,
    type: "price_changed",
    title: "Price updated",
    message: '27" Monitor changed from $189.00 to $169.00.',
    time: "Yesterday, 4:12 PM",
    group: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "brand_updated",
    title: "Brand details updated",
    message: "Logitech now has a new logo and description.",
    time: "Yesterday, 10:30 AM",
    group: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "low_stock",
    title: "Low stock: Laptop Stand",
    message: "Only 6 units left, below your minimum of 10.",
    time: "Mon, 9:05 AM",
    group: "Earlier",
    read: true,
  },
  {
    id: 7,
    type: "system",
    title: "Your inventory dashboard is ready",
    message: "Add products, brands, and categories to start tracking stock.",
    time: "Sun, 8:00 AM",
    group: "Earlier",
    read: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Visual config per notification type                                        */
/* -------------------------------------------------------------------------- */

const TYPE_CONFIG: Record<
  NotificationType,
  { icon: LucideIcon; className: string }
> = {
  out_of_stock: {
    icon: PackageX,
    className: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  low_stock: {
    icon: AlertTriangle,
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  product_added: {
    icon: PackagePlus,
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  price_changed: {
    icon: Tag,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  brand_updated: {
    icon: Check,
    className: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  system: {
    icon: Info,
    className: "bg-muted text-muted-foreground",
  },
};

const GROUP_ORDER: NotificationGroup[] = ["Today", "Yesterday", "Earlier"];

type Filter = "all" | "unread";

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function NotificationDrawer() {
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = items.filter((n) => !n.read).length;

  const visible = useMemo(
    () => (filter === "unread" ? items.filter((n) => !n.read) : items),
    [items, filter],
  );

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: visible.filter((n) => n.group === group),
      })).filter((g) => g.items.length > 0),
    [visible],
  );

  const markAsRead = (id: number) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllAsRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismiss = (id: number) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => setItems([]);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={
              unreadCount > 0
                ? `Notifications, ${unreadCount} unread`
                : "Notifications"
            }
          />
        }
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute left-3 top-[-5px] flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-background">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        {/* Header */}
        <SheetHeader className="space-y-1 border-b px-5 py-4 pr-12 text-left">
          <div className="flex items-center justify-between gap-3">
            <SheetTitle className="text-lg">Notifications</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 px-2 text-xs"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          </div>

          {/* Filter */}
          <div
            role="tablist"
            aria-label="Filter notifications"
            className="mt-3 inline-flex rounded-lg bg-muted p-1"
          >
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All
              <span className="ml-1.5 text-muted-foreground">
                {items.length}
              </span>
            </FilterButton>
            <FilterButton
              active={filter === "unread"}
              onClick={() => setFilter("unread")}
            >
              Unread
              <span className="ml-1.5 text-muted-foreground">
                {unreadCount}
              </span>
            </FilterButton>
          </div>
        </SheetHeader>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {grouped.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            grouped.map(({ group, items: groupItems }) => (
              <section key={group} aria-label={group}>
                <h3 className="sticky top-0 z-10 border-b bg-background/95 px-5 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
                  {group}
                </h3>
                <ul className="divide-y">
                  {groupItems.map((n) => (
                    <NotificationRow
                      key={n.id}
                      item={n}
                      onRead={() => markAsRead(n.id)}
                      onDismiss={() => dismiss(n.id)}
                    />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-5 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground"
              onClick={clearAll}
            >
              Clear all notifications
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                             */
/* -------------------------------------------------------------------------- */

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function NotificationRow({
  item,
  onRead,
  onDismiss,
}: {
  item: NotificationItem;
  onRead: () => void;
  onDismiss: () => void;
}) {
  const { icon: Icon, className } = TYPE_CONFIG[item.type];

  return (
    <li className="group relative">
      {/* Unread marker */}
      {!item.read && (
        <span
          aria-hidden
          className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-500"
        />
      )}

      <div
        className={cn(
          "flex gap-3 px-5 py-4 transition-colors hover:bg-muted/50",
          !item.read && "bg-muted/30",
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            className,
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>

        <div className="min-w-0 flex-1 pr-14">
          <p
            className={cn(
              "text-sm leading-snug",
              item.read ? "font-normal" : "font-semibold",
            )}
          >
            {item.title}
          </p>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
            {item.message}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground/80">{item.time}</p>
        </div>
      </div>

      {/* Row actions: always visible on touch, on hover/focus on desktop */}
      <div className="absolute right-3 top-3 flex gap-1 sm:opacity-0 sm:transition-opacity sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        {!item.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onRead}
            aria-label={`Mark "${item.title}" as read`}
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={onDismiss}
          aria-label={`Dismiss "${item.title}"`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}

function EmptyState({ filter }: { filter: Filter }) {
  const isUnread = filter === "unread";

  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center px-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {isUnread ? (
          <CheckCheck className="h-6 w-6 text-muted-foreground" />
        ) : (
          <BellOff className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      <p className="mt-4 text-sm font-medium">
        {isUnread ? "You're all caught up" : "No notifications"}
      </p>
      <p className="mt-1 max-w-[260px] text-sm text-muted-foreground">
        {isUnread
          ? "Everything has been read."
          : "Low stock alerts and product updates will appear here."}
      </p>
    </div>
  );
}
