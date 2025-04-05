
import { Bell, AlertTriangle, User, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth/AuthProvider";

export function Header() {
  const { logout, userId } = useAuth();

  return (
    <header className="border-b border-border h-16 flex items-center justify-between px-6 bg-background/90 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="flex items-center gap-4 lg:w-1/3">
        <div className="relative w-full max-w-sm hidden lg:flex">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search cargo..." 
            className="pl-8 bg-background border border-input"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-space-alert">
            3
          </Badge>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <AlertTriangle className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-space-warning">
            2
          </Badge>
        </Button>
        
        <div className="border-l border-border h-6 mx-2"></div>
        
        <Button variant="ghost" className="gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden md:inline-block">
            {userId || "Cmdr. Parker"}
          </span>
        </Button>
        
        <Button variant="ghost" size="icon" onClick={logout} title="Logout">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
