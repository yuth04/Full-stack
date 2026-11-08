
export type Period = "Today" | "This Week" | "This Month";

export const salesData: Record<
  Period,
  { label: string; sales: number }[]
> = {
  Today: [
    { label: "9 AM", sales: 180 },
    { label: "10 AM", sales: 320 },
    { label: "11 AM", sales: 260 },
    { label: "12 PM", sales: 480 },
    { label: "1 PM", sales: 350 },
    { label: "2 PM", sales: 520 },
    { label: "3 PM", sales: 410 },
  ],
  "This Week": [
    { label: "Mon", sales: 320 },
    { label: "Tue", sales: 480 },
    { label: "Wed", sales: 390 },
    { label: "Thu", sales: 620 },
    { label: "Fri", sales: 510 },
    { label: "Sat", sales: 850 },
    { label: "Sun", sales: 690 },
  ],
  "This Month": [
    { label: "Week 1", sales: 4200 },
    { label: "Week 2", sales: 5600 },
    { label: "Week 3", sales: 4800 },
    { label: "Week 4", sales: 3820 },
  ],
};

export const paymentData: Record<
  Period,
  { name: string; value: number; color: string }[]
> = {
  Today: [
    { name: "KHQR", value: 1422.75, color: "var(--chart-1)" },
    { name: "Cash", value: 995, color: "var(--chart-2)" },
    { name: "Card", value: 427.75, color: "var(--chart-3)" },
  ],
  "This Week": [
    { name: "KHQR", value: 1680, color: "var(--chart-1)" },
    { name: "Cash", value: 1320, color: "var(--chart-2)" },
    { name: "Card", value: 860, color: "var(--chart-3)" },
  ],
  "This Month": [
    { name: "KHQR", value: 8200, color: "var(--chart-1)" },
    { name: "Cash", value: 6450, color: "var(--chart-2)" },
    { name: "Card", value: 3770, color: "var(--chart-3)" },
  ],
};

export const metricsData: Record<
  Period,
  {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    description: string;
    icon: "sales" | "orders" | "average" | "stock";
  }[]
> = {
  Today: [
    { title: "Total Sales", value: "$2,845.50", change: "+12.8%", positive: true, description: "vs. previous day", icon: "sales" },
    { title: "Total Orders", value: "84", change: "+8.2%", positive: true, description: "vs. previous day", icon: "orders" },
    { title: "Average Order", value: "$33.87", change: "+4.3%", positive: true, description: "vs. previous day", icon: "average" },
    { title: "Low Stock Items", value: "12", change: "3 critical", positive: false, description: "need attention", icon: "stock" },
  ],
  "This Week": [
    { title: "Total Sales", value: "$3,860.00", change: "+10.4%", positive: true, description: "vs. last week", icon: "sales" },
    { title: "Total Orders", value: "246", change: "+6.8%", positive: true, description: "vs. last week", icon: "orders" },
    { title: "Average Order", value: "$15.69", change: "+3.1%", positive: true, description: "vs. last week", icon: "average" },
    { title: "Low Stock Items", value: "12", change: "3 critical", positive: false, description: "need attention", icon: "stock" },
  ],
  "This Month": [
    { title: "Total Sales", value: "$18,420.00", change: "+15.2%", positive: true, description: "vs. last month", icon: "sales" },
    { title: "Total Orders", value: "1,126", change: "+11.3%", positive: true, description: "vs. last month", icon: "orders" },
    { title: "Average Order", value: "$16.36", change: "+2.7%", positive: true, description: "vs. last month", icon: "average" },
    { title: "Low Stock Items", value: "12", change: "3 critical", positive: false, description: "need attention", icon: "stock" },
  ],
};

export const recentOrders = [
  { id: "#ORD-1048", customer: "Dara Sok", date: "10:42 AM", amount: 128.5, status: "Completed", payment: "KHQR" },
  { id: "#ORD-1047", customer: "Sophea Chan", date: "10:25 AM", amount: 56, status: "Pending", payment: "Cash" },
  { id: "#ORD-1046", customer: "Vicheka Kim", date: "10:12 AM", amount: 245.75, status: "Completed", payment: "Card" },
  { id: "#ORD-1045", customer: "Bunthoeun Lim", date: "09:58 AM", amount: 32, status: "Cancelled", payment: "Cash" },
];

export const lowStockProducts = [
  { name: "Wireless Mouse", sku: "PRD-001", stock: 3, minimum: 10 },
  { name: "USB-C Cable", sku: "PRD-018", stock: 5, minimum: 15 },
  { name: "Mechanical Keyboard", sku: "PRD-024", stock: 0, minimum: 5 },
];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
