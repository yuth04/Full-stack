"use client";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SalesSummary } from "@/components/dashboard/sales-summary";

const page = () => {
  return (
    <div className="px-2 py-2">
      <SalesSummary />
      <RecentActivity />
    </div>
  );
};

export default page;
