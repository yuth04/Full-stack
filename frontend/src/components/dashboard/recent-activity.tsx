
"use client";

import React from "react";
import { useRouter } from "next/navigation";

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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed" | string;
  date: string;
}

const defaultActivities: ActivityItem[] = [
  {
    id: "ORD-7352",
    user: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      initials: "OM",
    },
    action: "Purchased Pro License",
    amount: "+$1,999.00",
    status: "Completed",
    date: "2 mins ago",
  },
  {
    id: "ORD-7351",
    user: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      initials: "JL",
    },
    action: "Subscription Renewal",
    amount: "+$39.00",
    status: "Completed",
    date: "15 mins ago",
  },
  {
    id: "ORD-7350",
    user: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      initials: "IN",
    },
    action: "Refund Requested",
    amount: "-$299.00",
    status: "Pending",
    date: "1 hour ago",
  },
  {
    id: "ORD-7349",
    user: {
      name: "William Kim",
      email: "will@email.com",
      initials: "WK",
    },
    action: "Purchased Enterprise Plan",
    amount: "+$4,999.00",
    status: "Completed",
    date: "3 hours ago",
  },
  {
    id: "ORD-7348",
    user: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      initials: "SD",
    },
    action: "Payment Failed",
    amount: "$0.00",
    status: "Failed",
    date: "5 hours ago",
  },
];

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export function RecentActivity({
  activities = defaultActivities,
}: RecentActivityProps) {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );

      case "Pending":
        return (
          <Badge
            variant="outline"
            className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          >
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );

      case "Failed":
        return (
          <Badge
            variant="outline"
            className="border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
          >
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        );

      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest customer purchases, subscriptions, and transaction logs.
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={() => router.push("/dashboard/sales/activity")}
        >
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Action / Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={activity.user.avatar}
                        alt={activity.user.name}
                      />
                      <AvatarFallback className="text-xs">
                        {activity.user.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {activity.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {activity.user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-sm font-medium">
                  {activity.action}
                </TableCell>

                <TableCell>
                  {getStatusBadge(activity.status)}
                </TableCell>

                <TableCell className="text-xs text-muted-foreground">
                  {activity.date}
                </TableCell>

                <TableCell className="text-right text-sm font-semibold">
                  {activity.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
