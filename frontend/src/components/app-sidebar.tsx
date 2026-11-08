"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Store,
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  Package,
  Tags,
  Warehouse,
  Truck,
  RotateCcw,
  Users,
  ChartNoAxesCombined,
  UsersRound,
  Settings2,
  BadgeCheck,
} from "lucide-react";

const data = {
  user: {
    name: "Super Administrator",
    email: "yuth.code@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  teams: [
    {
      name: "VENDO POS",
      logo: <Store className="size-4" />,
      plan: "Nheung Phearakyuth",
    },
  ],

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard />,
      isActive: true,
      items: [
        { title: "Overview", url: "/" },
        { title: "Sales Summary", url: "/sales" },
        // { title: "Recent Activity", url: "/activity" },
      ],
    },
    {
      title: "Point of Sale",
      url: "/pos",
      icon: <ShoppingCart />,
      items: [
        { title: "New Sale", url: "/sales" },
        { title: "Sales History", url: "/history" },
        { title: "Held Orders", url: "/held-orders" },
      ],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: <Receipt />,
      items: [
        { title: "All Orders", url: "/" },
        // { title: "Pending Orders", url: "/pending" },
        // { title: "Completed Orders", url: "/completed" },
        // { title: "Cancelled Orders", url: "/cancelled" },
      ],
    },
    {
      title: "Products",
      url: "/products",
      icon: <Package />,
      items: [
        { title: "All Products", url: "/" },
        // { title: "Add Product", url: "/created" },
        { title: "Product Variants", url: "/variants" },
      ],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: <Tags />,
      items: [
        { title: "All Categories", url: "/" },
        // { title: "Add Category", url: "/categories/create" },
      ],
    },
    {
      title: "Brands",
      url: "/brands",
      icon: <BadgeCheck />,
      items: [{ title: "All Brands", url: "/" }],
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: <Warehouse />,
      items: [
        { title: "Stock Overview", url: "/" },
        { title: "Low Stock", url: "//low-stock" },
        { title: "Stock Adjustments", url: "/adjustments" },
        { title: "Stock Movements", url: "/movements" },
      ],
    },
    {
      title: "Purchases",
      url: "/purchases",
      icon: <Truck />,
      items: [
        { title: "All Purchases", url: "/" },
        { title: "Suppliers", url: "/suppliers" },
      ],
    },
    {
      title: "Returns & Refunds",
      url: "/returns",
      icon: <RotateCcw />,
      items: [
        { title: "All Returns", url: "/returns" },
        { title: "Pending Requests", url: "/returns/pending" },
        { title: "Refunds", url: "/refunds" },
        { title: "Exchanges", url: "/exchanges" },
      ],
    },
    {
      title: "Customers",
      url: "/customers",
      icon: <Users />,
      items: [
        { title: "All Customers", url: "/customers" },
        { title: "Add Customer", url: "/customers/create" },
        { title: "Customer Groups", url: "/customers/groups" },
      ],
    },
    {
      title: "Sales Reports",
      url: "/reports",
      icon: <ChartNoAxesCombined />,
      items: [
        { title: "Sales Overview", url: "/sales" },
        { title: "Revenue Reports", url: "/revenue" },
        { title: "Best-Selling Products", url: "/best-sellers" },
        { title: "Inventory Reports", url: "/inventory" },
      ],
    },
    {
      title: "Staff & Permissions",
      url: "/staff",
      icon: <UsersRound />,
      items: [
        { title: "All Staff", url: "/staff" },
        { title: "Add Staff", url: "/staff/create" },
        { title: "Roles", url: "/staff/roles" },
        { title: "Permissions", url: "/staff/permissions" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2 />,
      items: [
        { title: "General Settings", url: "/settings" },
        { title: "Store Information", url: "/settings/store" },
        { title: "Payment Methods", url: "/settings/payments" },
        { title: "Tax Settings", url: "/settings/taxes" },
      ],
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
