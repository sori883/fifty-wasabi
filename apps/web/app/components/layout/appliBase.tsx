import { useState } from "react";
import { cn } from "@acme/style-config/util";
import { Sidebar } from "~/components/sidebar";
import { SidebarContext } from "~/context";

export function AppliBase ({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <main className="flex flex-col h-full">
        <Sidebar />
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          collapsed ? "lg:pl-16" : "lg:pl-72"
        )}>
          <main className="py-4">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </main>
    </SidebarContext.Provider>
  );
};