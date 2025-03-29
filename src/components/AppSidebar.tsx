
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BarChart, 
  PlusCircle, 
  Settings, 
  LogOut,
  HelpCircle,
  MessageSquareText
} from "lucide-react";

const AppSidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Community Issues",
      url: "/community-issues",
      icon: Users,
    },
    {
      title: "Priority Issues",
      url: "/priority-issues",
      icon: BarChart,
    },
    {
      title: "🛠️ Report Issue",
      url: "/help-support",
      icon: MessageSquareText,
      badge: "New"
    },
  ];

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        {user && (
          <div className="px-3 py-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-app-blue to-app-green flex items-center justify-center text-white font-bold shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500">MAIN MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} 
                    className={`rounded-md transition-all duration-200 ${isActive(item.url) ? "bg-primary/10" : "hover:bg-gray-100"}`}>
                    <Link to={item.url} className="flex items-center gap-3 group px-3 py-2">
                      <item.icon className={`h-5 w-5 transition-colors 
                        ${isActive(item.url) ? "text-app-blue" : "text-gray-500 group-hover:text-app-blue"}`} />
                      <span className={`${isActive(item.url) ? "font-medium text-gray-900" : "text-gray-700"}`}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-app-green text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500">ACCOUNT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="rounded-md hover:bg-gray-100 transition-all duration-200">
                  <Link to="/settings" className="flex items-center gap-3 group px-3 py-2">
                    <Settings className="h-5 w-5 text-gray-500 group-hover:text-app-green transition-colors" />
                    <span className="text-gray-700">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-md hover:bg-gray-100 transition-all duration-200">
                  <Link to="/help-support" className="flex items-center gap-3 group px-3 py-2">
                    <HelpCircle className="h-5 w-5 text-gray-500 group-hover:text-app-blue transition-colors" />
                    <span className="text-gray-700">Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-md hover:bg-red-50 transition-all duration-200">
                  <button 
                    onClick={logout} 
                    className="flex items-center gap-3 w-full text-left group px-3 py-2"
                  >
                    <LogOut className="h-5 w-5 text-gray-500 group-hover:text-destructive transition-colors" />
                    <span className="text-gray-700 group-hover:text-destructive">Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
