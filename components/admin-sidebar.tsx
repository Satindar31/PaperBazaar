"use client";

import * as React from "react";
import {
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import { SessionProvider, useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import InsStatus from "./insstatus";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return null;
  }

  const data = {
    user: {
      name: session!.user!.name!,
      email: session!.user!.email!,
      avatar: session!.user!.image!,
    },
    navMain: [
      {
        title: "Admin",
        url: "#",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
          },
          {
            title: "Questions",
            url: "/admin/dashboard/questions",
          },
          {
            title: "Database",
            url: "/admin/db",
          },
        ],
      },
    ],
  };
  
  return (
    <SessionProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <InsStatus size="sm" />
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SessionProvider>
  );
}
