
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
          <div className="absolute top-2 left-2 md:hidden z-10">
            <SidebarTrigger className="bg-white/90 backdrop-blur-sm shadow-md hover:bg-primary/5" />
          </div>
          <div className="pt-8 md:pt-0 max-w-7xl mx-auto w-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4 md:p-6 border border-gray-100">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-10 left-10 w-72 h-72 bg-green-400/10 rounded-full filter blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Layout;
