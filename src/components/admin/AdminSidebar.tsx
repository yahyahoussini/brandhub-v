import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";
import {
  LayoutDashboard,
  FileEdit,
  BarChart3,
  Search,
  Users,
  FolderKanban,
  Package,
  Settings,
  Key,
  LogOut,
  MessageSquare,
  CreditCard,
  TrendingUp,
  Mail,
  Star
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
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Gestion Blog", url: "/admin/blog", icon: FileEdit },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "SEO", url: "/admin/seo", icon: Search },
  { title: "Projets", url: "/admin/projects", icon: FolderKanban },
  { title: "Clients", url: "/admin/clients", icon: Users },
  { title: "Services", url: "/admin/services", icon: Package },
  { title: "Demandes Contact", url: "/admin/inquiries", icon: MessageSquare },
  { title: "Avis Clients", url: "/admin/testimonials", icon: Star },
  { title: "Revenus", url: "/admin/revenue", icon: CreditCard },
  { title: "Marketing", url: "/admin/marketing", icon: TrendingUp },
  { title: "Email Campaigns", url: "/admin/email", icon: Mail },
  { title: "API Keys", url: "/admin/api-keys", icon: Key },
  { title: "Paramètres", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      navigate("/");
    }
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <img 
            src={logo} 
            alt="BrandHub Logo" 
            className="w-8 h-8"
          />
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">BrandHub Admin</h2>
              <p className="text-xs text-muted-foreground">Panel d'administration</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-muted"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {!collapsed && "Déconnexion"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}