"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { ChevronRightIcon } from "lucide-react";

type NavSubItem = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  items?: NavSubItem[];
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

// Builds the real URL for a sub-link. Handles all three styles used in the menu:
//   "/"                  -> the parent URL itself (index route)
//   "/purchases/create"  -> already contains the parent, used as is
//   "/low-stock"         -> relative, appended to the parent
function buildPath(parentUrl: string, childUrl: string) {
  if (childUrl === "/") return parentUrl;
  if (childUrl.startsWith(parentUrl)) return childUrl;

  return `${parentUrl}/${childUrl}`.replace(/\/{2,}/g, "/");
}

function isPathActive(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

// Returns the single best-matching sub-link path for the current page.
// The longest match wins, so "/purchases/create" highlights "Create Purchase"
// and not "All Purchases" as well.
function getActiveSubPath(item: NavItem, pathname: string): string | null {
  const matches = (item.items ?? [])
    .map((sub) => buildPath(item.url, sub.url))
    .filter((path) => isPathActive(pathname, path))
    .sort((a, b) => b.length - a.length);

  return matches[0] ?? null;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const [openItem, setOpenItem] = useState<string | null>(null);

  // Open the dropdown that contains the current page.
  // This only ever opens a dropdown; it never closes one, so clicking a
  // sub-item keeps its dropdown open.
  useEffect(() => {
    const activeParent = items.find(
      (item) => getActiveSubPath(item, pathname) !== null,
    );

    if (activeParent) {
      setOpenItem(activeParent.title);
    }
  }, [pathname, items]);

  // Only one dropdown can be open at a time.
  const handleToggle = (title: string, open: boolean) => {
    setOpenItem(open ? title : null);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = Boolean(item.items?.length);
          const isOpen = openItem === item.title;
          const activeSubPath = getActiveSubPath(item, pathname);
          const isActive = activeSubPath !== null;

          // Regular navigation link without a dropdown.
          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={pathname === item.url}
                  tooltip={item.title}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Dropdown navigation item.
          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={(open) => handleToggle(item.title, open)}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                  />
                }
              >
                {item.icon}
                <span>{item.title}</span>

                <ChevronRightIcon
                  className={`ml-auto transition-transform duration-200 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    const fullPath = buildPath(item.url, subItem.url);

                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          render={<Link href={fullPath} />}
                          isActive={fullPath === activeSubPath}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}