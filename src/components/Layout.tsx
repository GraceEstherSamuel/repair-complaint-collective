
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isMapPage = location.pathname === "/issue-map";
  const isHelpSupportPage = location.pathname === "/help-support";
  
  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-background to-muted/50">
      <Navbar />
      <div className="flex flex-1 w-full">
        <AppSidebar />
        <main className={`flex-1 p-4 md:p-6 relative ${isMapPage || isHelpSupportPage ? 'md:p-4' : ''}`}>
          <div className="absolute top-2 left-2 md:hidden z-10">
            <SidebarTrigger className="bg-white/90 backdrop-blur-sm shadow-md hover:bg-primary/5" />
          </div>
          <div className={`pt-8 md:pt-0 max-w-7xl mx-auto w-full ${isMapPage || isHelpSupportPage ? 'h-full' : ''}`}>
            <div className={`${!isMapPage && !isHelpSupportPage ? 'bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 transition-all duration-300 hover:shadow-md' : ''}`}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-10 left-10 w-96 h-96 bg-green-400/10 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-40 right-40 w-72 h-72 bg-orange-400/5 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow"></div>
    </div>
  );
};

export default Layout;
