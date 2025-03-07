
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
  LogOut 
} from "lucide-react";

const AppSidebar = () => {
  const { logout } = useAuth();
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
      title: "Report Issue",
      url: "/report-issue",
      icon: PlusCircle,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} 
                    className={isActive(item.url) ? "bg-primary/10" : ""}>
                    <Link to={item.url} className="flex items-center gap-3 group">
                      <item.icon className={`h-5 w-5 transition-colors 
                        ${isActive(item.url) ? "text-app-blue" : "group-hover:text-app-blue"}`} />
                      <span className={isActive(item.url) ? "font-medium" : ""}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="#" className="flex items-center gap-3 group">
                    <Settings className="h-5 w-5 group-hover:text-app-green transition-colors" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={logout} 
                    className="flex items-center gap-3 w-full text-left group"
                  >
                    <LogOut className="h-5 w-5 group-hover:text-destructive transition-colors" />
                    <span>Logout</span>
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
