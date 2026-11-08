import OrderDetail from "@/components/orders/order-detail/order-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <OrderDetail orderId={id} />;
}