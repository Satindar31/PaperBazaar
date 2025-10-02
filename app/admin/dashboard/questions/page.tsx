import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { isUserAdmin } from "@/hooks/admin/stats";
import { getQuestionsWithBets } from "@/hooks/admin/getQuestionsWithBets";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import QuestionsClient from "./questions-client";

export default async function QuestionsPage() {
  const session = await auth();
  const admin = await isUserAdmin(session?.user?.email);

  if (!admin) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
      </div>
    );
  }

  const questions = await getQuestionsWithBets();

  return (
    <SessionProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AdminSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                <Suspense fallback={<div>Loading...</div>}>
                  <QuestionsClient initialQuestions={questions} />
                </Suspense>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
