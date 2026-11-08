import OrdersList from "@/components/orders/orders-list";

export default function Page() {
  return (
    <OrdersList
      title="All Orders"
      description="Manage and track all your customer orders."
      status="All"
    />
  );
}