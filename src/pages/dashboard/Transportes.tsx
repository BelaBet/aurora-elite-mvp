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
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import TravelHistory from "@/components/dashboard/TravelHistory";

const aircrafts = [
  {
    id: 1,
    name: "Gulfstream G650",
    type: "Jato Executivo",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&auto=format&fit=crop",
    capacity: 16,
    range: "12,960 km",
    features: ["Wi-Fi de alta velocidade", "Cozinha completa", "Suite master"],
  },
  {
    id: 2,
    name: "Bombardier Global 7500",
    type: "Jato Ultra Long Range",
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&auto=format&fit=crop",
    capacity: 19,
    range: "14,260 km",
    features: ["4 zonas de estar", "Quarto privativo", "Chuveiro a bordo"],
  },
  {
    id: 3,
    name: "Dassault Falcon 8X",
    type: "Jato Trimotor",
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&auto=format&fit=crop",
    capacity: 14,
    range: "11,945 km",
    features: ["3 cabines independentes", "Galley dupla", "Sistema de som Bose"],
  },
  {
    id: 4,
    name: "Embraer Phenom 300E",
    type: "Jato Leve",
    image: "https://images.unsplash.com/photo-1559628129-67cf63b72248?w=800&auto=format&fit=crop",
    capacity: 8,
    range: "3,650 km",
    features: ["Cabine mais silenciosa", "Wi-Fi", "Bagageiro amplo"],
  },
  {
    id: 5,
    name: "Cessna Caravan",
    type: "Turboélice",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop",
    capacity: 9,
    range: "1,982 km",
    features: ["Versatilidade de pouso", "Cabine espaçosa", "Operação em pistas curtas"],
  },
  {
    id: 6,
    name: "King Air C90",
    type: "Turboélice",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&auto=format&fit=crop",
    capacity: 7,
    range: "2,446 km",
    features: ["Cabine pressurizada", "Conforto executivo", "Alta confiabilidade"],
  },
  {
    id: 7,
    name: "King Air B200",
    type: "Turboélice",
    image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&auto=format&fit=crop",
    capacity: 9,
    range: "3,338 km",
    features: ["Velocidade de cruzeiro alta", "Cabine ampla", "Autonomia estendida"],
  },
  {
    id: 8,
    name: "Seneca I",
    type: "Bimotor Pistão",
    image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&auto=format&fit=crop",
    capacity: 5,
    range: "1,352 km",
    features: ["Economia operacional", "Ideal para curtas distâncias", "Manutenção acessível"],
  },
  {
    id: 9,
    name: "Seneca II",
    type: "Bimotor Pistão",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2c1cf?w=800&auto=format&fit=crop",
    capacity: 5,
    range: "1,463 km",
    features: ["Turbo-alimentado", "Performance aprimorada", "Cabine confortável"],
  },
  {
    id: 10,
    name: "Seneca III",
    type: "Bimotor Pistão",
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&auto=format&fit=crop",
    capacity: 5,
    range: "1,520 km",
    features: ["Aviônica moderna", "Piloto automático", "Trem retrátil"],
  },
  {
    id: 11,
    name: "Seneca V",
    type: "Bimotor Pistão",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop",
    capacity: 6,
    range: "1,600 km",
    features: ["Painel Garmin G1000", "Motor Continental", "Última geração da série"],
  },
  {
    id: 12,
    name: "Sikorsky S-76",
    type: "Helicóptero VIP",
    image: "https://images.unsplash.com/photo-1608023136037-626dad6c6188?w=800&auto=format&fit=crop",
    capacity: 8,
    range: "750 km",
    features: ["Interior executivo", "Sistema de entretenimento", "Bar"],
  },
  {
    id: 13,
    name: "Airbus ACH160",
    type: "Helicóptero de Luxo",
    image: "https://images.unsplash.com/photo-1534321238895-da3ab632df3e?w=800&auto=format&fit=crop",
    capacity: 6,
    range: "850 km",
    features: ["Skylight panorâmico", "Assentos massageadores", "Conectividade total"],
  },
  {
    id: 14,
    name: "Robinson R66",
    type: "Helicóptero Turbina",
    image: "https://images.unsplash.com/photo-1551199397-72180e0615ad?w=800&auto=format&fit=crop",
    capacity: 4,
    range: "602 km",
    features: ["Motor Rolls-Royce", "Baixo custo operacional", "Ideal para transfers"],
  },
  {
    id: 15,
    name: "Robinson R22",
    type: "Helicóptero Leve",
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800&auto=format&fit=crop",
    capacity: 2,
    range: "463 km",
    features: ["Compacto e ágil", "Ideal para sobrevoos", "Econômico"],
  },
];

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
    <div className="space-y-8 animate-fade-in">
      {/* Travel History */}
      <TravelHistory />

      {/* Route Selector */}
      <Card className="glass border-gold/10">
        <CardContent className="p-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAircrafts.map((aircraft, index) => (
          <Card 
            key={aircraft.id}
            className="group overflow-hidden border-border/50 hover-lift cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
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
