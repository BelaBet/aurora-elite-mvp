import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Plane, 
  Ship, 
  Car, 
  Sparkles, 
  MapPin,
  Calendar,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TravelRecord {
  id: string;
  destination: string;
  origin: string | null;
  travel_type: string;
  travel_date: string;
  return_date: string | null;
  status: string;
  service_provider: string | null;
  total_cost: number | null;
  currency: string | null;
  notes: string | null;
  created_at: string;
}

const travelTypeIcons: Record<string, typeof Plane> = {
  jet: Plane,
  helicopter: Plane,
  yacht: Ship,
  car: Car,
  experience: Sparkles,
};

const travelTypeLabels: Record<string, string> = {
  jet: "Jato Privado",
  helicopter: "Helicóptero",
  yacht: "Iate",
  car: "Carro de Luxo",
  experience: "Experiência VIP",
};

const statusColors: Record<string, string> = {
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  upcoming: "bg-gold/20 text-gold border-gold/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
};

const statusLabels: Record<string, string> = {
  completed: "Concluída",
  upcoming: "Agendada",
  cancelled: "Cancelada",
};

const TravelHistory = () => {
  const { user } = useAuth();
  const [travels, setTravels] = useState<TravelRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravels = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("travel_history")
        .select("*")
        .eq("user_id", user.id)
        .order("travel_date", { ascending: false })
        .limit(10);

      if (!error && data) {
        setTravels(data);
      }
      setLoading(false);
    };

    fetchTravels();
  }, [user]);

  if (loading) {
    return (
      <Card className="glass border-gold/10">
        <CardHeader>
          <CardTitle className="text-lg font-light tracking-wider gold-text">
            Histórico de Viagens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (travels.length === 0) {
    return (
      <Card className="glass border-gold/10">
        <CardHeader>
          <CardTitle className="text-lg font-light tracking-wider gold-text">
            Histórico de Viagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Nenhuma viagem registrada ainda.</p>
            <p className="text-xs mt-1">Suas próximas aventuras aparecerão aqui.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-gold/10">
      <CardHeader>
        <CardTitle className="text-lg font-light tracking-wider gold-text">
          Histórico de Viagens
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {travels.map((travel) => {
          const Icon = travelTypeIcons[travel.travel_type] || Plane;
          
          return (
            <div
              key={travel.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-background/30 border border-border/30 hover:border-gold/20 transition-colors"
            >
              <div className="p-3 rounded-full bg-gold/10">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">
                    {travel.origin && `${travel.origin} → `}{travel.destination}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={statusColors[travel.status] || statusColors.completed}
                  >
                    {statusLabels[travel.status] || travel.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(travel.travel_date), "dd MMM yyyy", { locale: ptBR })}
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {travelTypeLabels[travel.travel_type] || travel.travel_type}
                  </span>
                  
                  {travel.service_provider && (
                    <span className="text-gold/80">
                      {travel.service_provider}
                    </span>
                  )}
                </div>
                
                {travel.total_cost && (
                  <p className="text-sm text-gold mt-2 font-medium">
                    {new Intl.NumberFormat('pt-BR', { 
                      style: 'currency', 
                      currency: travel.currency || 'USD' 
                    }).format(travel.total_cost)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TravelHistory;
