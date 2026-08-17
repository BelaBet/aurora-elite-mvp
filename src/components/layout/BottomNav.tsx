import { NavLink, useLocation } from "react-router-dom";
import { Plane, MessageCircle, Building2, Lock, MoreHorizontal, Car, Ship, Sparkles, Shield, Snowflake, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { to: "/dashboard", icon: Plane, label: "Transportes" },
  { to: "/dashboard/concierge", icon: MessageCircle, label: "Concierge" },
  { to: "/dashboard/hospedagem", icon: Building2, label: "Hospedagem" },
  { to: "/dashboard/vault", icon: Lock, label: "The Vault" },
];

const moreItems = [
  { to: "/dashboard/carros", icon: Car, label: "Carros de Luxo" },
  { to: "/dashboard/iates", icon: Ship, label: "Iates & Barcos" },
  { to: "/dashboard/experiencias", icon: Sparkles, label: "Experiências VIP" },
  { to: "/dashboard/esqui", icon: Snowflake, label: "Ski & Snow" },
  { to: "/dashboard/guarda-roupa", icon: Shirt, label: "Guarda-Roupa" },
  { to: "/dashboard/seguros", icon: Shield, label: "Seguros" },
];

const BottomNav = () => {
  const location = useLocation();
  
  const isMoreActive = moreItems.some(item => location.pathname === item.to);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1 sm:px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || 
            (to !== "/dashboard" && location.pathname.startsWith(to));
          
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-2 rounded-lg min-w-0 flex-1 transition-all duration-300",
                isActive 
                  ? "text-gold" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 sm:p-2 rounded-full transition-all duration-300",
                isActive && "bg-gold/10"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-medium max-w-full truncate">
                {label}
              </span>
            </NavLink>
          );
        })}

        {/* More Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center gap-0.5 px-1.5 sm:px-3 py-2 rounded-lg min-w-0 flex-1 transition-all duration-300",
                isMoreActive 
                  ? "text-gold" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 sm:p-2 rounded-full transition-all duration-300",
                isMoreActive && "bg-gold/10"
              )}>
                <MoreHorizontal className="h-5 w-5" />
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-medium max-w-full truncate">
                Mais
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            side="top" 
            className="w-56 glass mb-2"
          >
            {moreItems.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to;
              return (
                <DropdownMenuItem key={to} asChild>
                  <NavLink
                    to={to}
                    className={cn(
                      "flex items-center gap-3 w-full cursor-pointer",
                      isActive && "text-gold"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </NavLink>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default BottomNav;
