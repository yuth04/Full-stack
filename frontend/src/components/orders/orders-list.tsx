
"use client";

import { useMemo, useState } from "react";

import OrdersHeader from "./orders-header";
import OrdersSummary from "./orders-summary";
import OrdersFilters from "./orders-filters";
import OrdersTable from "./orders-table";
import OrdersPagination from "./orders-pagination";

import { OrderFilter } from "@/types/order";
import { orders } from "@/data/order";

interface OrdersListProps {
  title: string;
  description: string;
  status: OrderFilter;
}

export default function OrdersList({
  title,
  description,
  status,
}: OrdersListProps) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<OrderFilter>(status);

  const pageSize = 5;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        selectedStatus === "All" || order.status === selectedStatus;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        order.id.toLowerCase().includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue) ||
        order.email.toLowerCase().includes(searchValue);

      const matchesDate = !date || order.date === date;

      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [selectedStatus, search, date]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetFilters = () => {
    setSearch("");
    setDate("");
    setSelectedStatus(status);
    setPage(1);
  };

  return (
    <div className="min-h-screen space-y-6 bg-background px-3 py-5 text-foreground sm:px-6">
      <OrdersHeader title={title} description={description} />

      <OrdersSummary orders={orders} />

      <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <OrdersFilters
          search={search}
          date={date}
          status={selectedStatus}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onDateChange={(value) => {
            setDate(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setSelectedStatus(value);
            setPage(1);
          }}
          onReset={resetFilters}
        />

        <OrdersTable orders={paginatedOrders} />

        <OrdersPagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
