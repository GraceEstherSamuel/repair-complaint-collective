
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-background to-muted/50">
      <Navbar />
      <div className="flex flex-1 w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 relative">
          <div className="absolute top-2 left-2 md:hidden">
            <SidebarTrigger />
          </div>
          <div className="pt-8 md:pt-0 max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
