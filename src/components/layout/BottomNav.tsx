import { NavLink, useLocation } from "react-router-dom";
import { Plane, MessageCircle, Building2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: Plane, label: "Transportes" },
  { to: "/dashboard/concierge", icon: MessageCircle, label: "Concierge" },
  { to: "/dashboard/hospedagem", icon: Building2, label: "Hospedagem" },
  { to: "/dashboard/vault", icon: Lock, label: "The Vault" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to || 
            (to !== "/dashboard" && location.pathname.startsWith(to));
          
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300",
                isActive 
                  ? "text-gold" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-all duration-300",
                isActive && "bg-gold/10"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] tracking-wider uppercase font-medium">
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
