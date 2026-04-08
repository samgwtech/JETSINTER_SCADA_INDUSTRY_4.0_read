import type { ReactNode } from "react";

type DashboardLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export default function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-border bg-sidebar overflow-y-auto flex flex-col gap-1">
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}
