"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

const allActivities: ActivityItem[] = [
  {
    id: "ORD-7352",
    user: { name: "Olivia Martin", email: "olivia.martin@email.com", initials: "OM" },
    action: "Purchased Pro License",
    amount: "+$1,999.00",
    status: "Completed",
    date: "Nov 3, 2026 13:42",
  },
  {
    id: "ORD-7351",
    user: { name: "Jackson Lee", email: "jackson.lee@email.com", initials: "JL" },
    action: "Subscription Renewal",
    amount: "+$39.00",
    status: "Completed",
    date: "Nov 3, 2026 13:30",
  },
  {
    id: "ORD-7350",
    user: { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", initials: "IN" },
    action: "Refund Requested",
    amount: "-$299.00",
    status: "Pending",
    date: "Nov 3, 2026 12:15",
  },
  {
    id: "ORD-7349",
    user: { name: "William Kim", email: "will@email.com", initials: "WK" },
    action: "Purchased Enterprise Plan",
    amount: "+$4,999.00",
    status: "Completed",
    date: "Nov 3, 2026 10:45",
  },
  {
    id: "ORD-7348",
    user: { name: "Sofia Davis", email: "sofia.davis@email.com", initials: "SD" },
    action: "Payment Failed",
    amount: "$0.00",
    status: "Failed",
    date: "Nov 3, 2026 08:20",
  },
  {
    id: "ORD-7347",
    user: { name: "Liam Chen", email: "liam.chen@email.com", initials: "LC" },
    action: "Purchased Starter Kit",
    amount: "+$49.00",
    status: "Completed",
    date: "Nov 2, 2026 19:10",
  },
  {
    id: "ORD-7346",
    user: { name: "Emma Watson", email: "emma.w@email.com", initials: "EW" },
    action: "Subscription Renewal",
    amount: "+$99.00",
    status: "Completed",
    date: "Nov 2, 2026 16:05",
  },
];

export default function RecentActivityViewAllPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "Failed":
        return (
          <Badge variant="outline" className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Filter activities based on Search query & Status selection
  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      activity.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recent Activity</h1>
          <p className="text-sm text-muted-foreground">
            Complete transaction history and customer activity log.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Activity History</CardTitle>
          <CardDescription>
            Showing {filteredActivities.length} total transactions.
          </CardDescription>

          {/* Search & Filter Bar */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, email, ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Action / Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {activity.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                          <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{activity.user.name}</span>
                          <span className="text-xs text-muted-foreground">{activity.user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{activity.action}</TableCell>
                    <TableCell>{getStatusBadge(activity.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{activity.date}</TableCell>
                    <TableCell className="text-right text-sm font-semibold">{activity.amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No activity logs found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between pt-4 border-t mt-4">
            <span className="text-xs text-muted-foreground">
              Page 1 of 1
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}