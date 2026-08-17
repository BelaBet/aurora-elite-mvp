import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plane, 
  MapPin, 
  Users, 
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TravelHistory from "@/components/dashboard/TravelHistory";
import { aircrafts } from "@/data/aircrafts";

const Transportes = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredAircrafts = selectedType
    ? aircrafts.filter((a) => {
        if (selectedType === "jet") return a.type.includes("Jato");
        if (selectedType === "turbo") return a.type.includes("Turboélice") || a.type.includes("Bimotor");
        if (selectedType === "helicopter") return a.type.includes("Helicóptero");
        return true;
      })
    : aircrafts;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      <TravelHistory />

      {/* Route Selector */}
      <Card className="glass border-gold/10">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg font-light tracking-wider mb-6 gold-text">
            Planeje sua Rota
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Origem
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="São Paulo (CGH)"
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </div>
            
            <div className="hidden md:flex items-center justify-center h-10">
              <ArrowRight className="h-5 w-5 text-gold" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Destino
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Aspen (ASE)"
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mt-6">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
              className={cn(
                "rounded-full",
                selectedType === null && "gold-gradient text-aurora-black"
              )}
            >
              Todos
            </Button>
            <Button
              variant={selectedType === "jet" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("jet")}
              className={cn(
                "rounded-full",
                selectedType === "jet" && "gold-gradient text-aurora-black"
              )}
            >
              <Plane className="h-4 w-4 mr-2" />
              Jatos
            </Button>
            <Button
              variant={selectedType === "turbo" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("turbo")}
              className={cn(
                "rounded-full",
                selectedType === "turbo" && "gold-gradient text-aurora-black"
              )}
            >
              Turboélice / Bimotor
            </Button>
            <Button
              variant={selectedType === "helicopter" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("helicopter")}
              className={cn(
                "rounded-full",
                selectedType === "helicopter" && "gold-gradient text-aurora-black"
              )}
            >
              Helicópteros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Aircraft Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAircrafts.map((aircraft, index) => (
          <Card 
            key={aircraft.id}
            className="group overflow-hidden border-border/50 hover-lift cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img
                src={aircraft.image}
                alt={aircraft.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-gold/90 text-aurora-black border-0">
                {aircraft.type}
              </Badge>
            </div>
            
            <CardContent className="p-5">
              <h3 className="text-lg font-medium mb-2">{aircraft.name}</h3>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {aircraft.capacity} pax
                </span>
                <span>Alcance: {aircraft.range}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {aircraft.features.slice(0, 2).map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <Button className="w-full gold-gradient text-aurora-black hover:opacity-90">
                Solicitar Cotação
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transportes;
