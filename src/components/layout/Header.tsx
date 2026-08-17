import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const initials = profile?.pseudonym
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "LV";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
            <span className="text-sm font-light gold-text">LV</span>
          </div>
          <span className="text-base sm:text-lg font-light tracking-widest hidden sm:block">
            LV CONCIERGE
          </span>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{profile?.pseudonym || "Membro"}</p>
                <p className="text-xs text-muted-foreground max-w-[180px] truncate">{user?.email}</p>
              </div>
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-gold/30">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gold/10 text-gold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 glass">
            <DropdownMenuItem onClick={() => navigate("/dashboard/profile")} className="gap-2">
              <User className="h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
