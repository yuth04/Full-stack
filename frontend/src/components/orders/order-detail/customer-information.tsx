import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { Order } from "@/types/order";

export default function CustomerInformation({ order }: { order: Order }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <UserRound className="h-5 w-5 text-muted-foreground" />
        <h2 className="font-semibold">Customer Information</h2>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserRound className="h-6 w-6" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold">{order.customer}</p>
          <p className="text-xs text-muted-foreground">Customer</p>
        </div>
      </div>

      <div className="mt-5 space-y-4 border-t border-border pt-4">
        <InfoRow icon={Mail} label="Email" value={order.email} />
        <InfoRow icon={Phone} label="Phone" value="Not provided" />
        <InfoRow icon={MapPin} label="Address" value="Not provided" />
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="break-words font-medium">{value}</p>
      </div>
    </div>
  );
}