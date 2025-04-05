
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, ChevronRight, 
  LayoutDashboard, Package, Search, 
  Trash2, Clock, Settings, Rocket,
  Box, Boxes
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full border-r border-border bg-sidebar transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center w-full")}>
          <div className="h-8 w-8 rounded-md bg-space-highlight flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className={cn("font-semibold", collapsed && "hidden")}>
            ISS Cargo System
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8", collapsed && "hidden")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <nav className="p-2 space-y-2">
        {!collapsed && (
          <div className="px-2 py-4">
            <p className="text-xs text-muted-foreground">MAIN NAVIGATION</p>
          </div>
        )}

        <NavItem
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Dashboard"
          href="/"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Box className="h-5 w-5" />}
          label="Cargo Map"
          href="/cargo-map"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Search className="h-5 w-5" />}
          label="Search & Retrieve"
          href="/search"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Package className="h-5 w-5" />}
          label="Inventory"
          href="/inventory"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Boxes className="h-5 w-5" />}
          label="Place Items"
          href="/place-items"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Trash2 className="h-5 w-5" />}
          label="Waste Management"
          href="/waste"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Clock className="h-5 w-5" />}
          label="Time Simulation"
          href="/simulation"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          href="/settings"
          collapsed={collapsed}
        />
      </nav>

      {collapsed && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  collapsed: boolean;
}

function NavItem({ icon, label, href, collapsed }: NavItemProps) {
  const isActive = location.pathname === href;

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link to={href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="icon"
              className={cn(
                "w-full h-10",
                isActive && "bg-primary text-primary-foreground"
              )}
            >
              {icon}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link to={href}>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 h-10",
          isActive && "bg-primary text-primary-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
}
