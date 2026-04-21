import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JETSINTER - PLC Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-foreground h-screen flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="shrink-0 h-12 flex items-center px-6 border-b border-border bg-sidebar">
          <span className="text-sm font-bold tracking-[0.2em] uppercase neon-text">
            Jetsinter
          </span>
          <span className="ml-2 text-sm font-semibold tracking-widest uppercase text-muted-foreground">
            — PLC Dashboard
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_#34d39966]" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </header>

        {/* Full remaining height, no scroll on root */}
        <div className="flex-1 min-h-0">
          {children}
        </div>
      </body>
    </html>
  );
}