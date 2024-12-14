import BreadcrumbHeader from "@/layout/BreadCumbHeader";
// import DesktopSidebar from "@/layout/Sidebar";
import { Separator } from "@radix-ui/react-context-menu";
import ThemeToggle from "@/components/ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* <DesktopSidebar />. */}

      <div className="flex flex-col flex-[4]">
        <header className="flex items-center justify-between px-6 py-4 h-[64px]">
          <BreadcrumbHeader />
          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </header>

        <Separator className="border-t" />

        <main className="flex-1 overflow-auto py-4 container">
          <div className="text-accent-foreground p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
