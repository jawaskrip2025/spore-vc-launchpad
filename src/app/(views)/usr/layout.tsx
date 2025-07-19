import { ScrollArea } from "@/components/ui/scroll-area";
import NavbarAdmin from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative bg-slate-50 dark:bg-neutral-950">
      <Sidebar />
      <main className="flex-1 w-full z-10">
        <ScrollArea className="h-screen">
          <NavbarAdmin />
          <div className="container px-4">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
