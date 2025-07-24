import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Building2, 
  FileText, 
  LogOut, 
  Menu,
  PieChart,
  Users,
  TrendingUp,
  Database
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "RO Wise Points",
    url: "/dashboard/ro-points",
    icon: PieChart,
  },
  {
    title: "Txns. MonthWise",
    url: "/dashboard/transactions",
    icon: TrendingUp,
  },
  {
    title: "Non-FI Status Report",
    url: "/dashboard/non-fi",
    icon: FileText,
  },
  {
    title: "SSS Products",
    url: "/dashboard/sss-products",
    icon: Database,
  },
  {
    title: "Branch Analytics",
    url: "/dashboard/branches",
    icon: Building2,
  },
  {
    title: "CSP Management",
    url: "/dashboard/csp",
    icon: Users,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const userId = localStorage.getItem("userId") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("loginAs");
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <Sidebar className={`border-r border-border ${collapsed ? "w-14" : "w-64"}`} collapsible="icon">
      <SidebarContent className="bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-primary">APGB FI</h2>
                <p className="text-xs text-muted-foreground">{userId}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={collapsed ? "hidden" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      isActive(item.url)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    } transition-colors`}
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="flex items-center space-x-3 w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}