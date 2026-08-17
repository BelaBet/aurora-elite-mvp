import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Ship, 
  MapPin, 
  Users, 
  Anchor,
  Bed,
  Calendar,
  Waves
} from "lucide-react";
import { cn } from "@/lib/utils";

const yachts = [
  {
    id: 1,
    name: "Azzam",
    type: "Mega Iate",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop",
    length: "180m",
    cabins: 12,
    crew: 80,
    guests: 36,
    features: ["Helipad", "Piscina", "Spa completo", "Cinema"],
    pricePerWeek: "€ 3.000.000",
  },
  {
    id: 2,
    name: "Eclipse",
    type: "Super Iate",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&auto=format&fit=crop",
    length: "162m",
    cabins: 10,
    crew: 70,
    guests: 24,
    features: ["Submarino", "2 Helipads", "Discoteca", "Piscinas"],
    pricePerWeek: "€ 2.500.000",
  },
  {
    id: 3,
    name: "Benetti Oasis",
    type: "Iate de Luxo",
    image: "https://images.unsplash.com/photo-1605281317010-fe5ece8d40f5?w=800&auto=format&fit=crop",
    length: "75m",
    cabins: 6,
    crew: 18,
    guests: 14,
    features: ["Beach club", "Piscina infinita", "Ginásio", "Jacuzzi"],
    pricePerWeek: "€ 800.000",
  },
  {
    id: 4,
    name: "Sunseeker 155",
    type: "Super Iate",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&auto=format&fit=crop",
    length: "47m",
    cabins: 5,
    crew: 11,
    guests: 12,
    features: ["Terraço expansível", "Bar na popa", "Tender garage"],
    pricePerWeek: "€ 350.000",
  },
  {
    id: 5,
    name: "Princess X95",
    type: "Iate Explorer",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&auto=format&fit=crop",
    length: "29m",
    cabins: 4,
    crew: 4,
    guests: 8,
    features: ["Super flybridge", "Design contemporâneo", "Beach platform"],
    pricePerWeek: "€ 120.000",
  },
  {
    id: 6,
    name: "Feadship Samaya",
    type: "Mega Iate",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop",
    length: "85m",
    cabins: 8,
    crew: 24,
    guests: 16,
    features: ["Sala de cinema", "Spa", "Piscina de vidro", "Wine cellar"],
    pricePerWeek: "€ 1.200.000",
  },
];

const destinations = [
  "Mediterrâneo",
  "Caribe",
  "Maldivas",
  "Grécia",
  "Costa Azul",
  "Croácia",
];

const Iates = () => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredYachts = selectedType
    ? yachts.filter((y) => y.type === selectedType)
    : yachts;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-light tracking-wider gold-text mb-2">
          Iates & Embarcações
        </h1>
        <p className="text-muted-foreground">
          Os mais exclusivos iates do mundo à sua disposição
        </p>
      </div>

      {/* Search Section */}
      <Card className="glass border-gold/10">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Destino
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  placeholder="Mediterrâneo, Caribe, Maldivas..."
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Período
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Selecione as datas"
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </div>
          </div>

          {/* Quick Destinations */}
          <div className="flex flex-wrap gap-2 mb-6">
            {destinations.map((dest) => (
              <Badge 
                key={dest}
                variant="outline" 
                className="cursor-pointer hover:bg-gold/10 transition-colors"
                onClick={() => setSelectedDestination(dest)}
              >
                <Waves className="h-3 w-3 mr-1" />
                {dest}
              </Badge>
            ))}
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
              className={cn(
                "rounded-full",
                selectedType === null && "gold-gradient text-aurora-black"
              )}
            >
              <Ship className="h-4 w-4 mr-2" />
              Todos
            </Button>
            <Button
              variant={selectedType === "Mega Iate" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("Mega Iate")}
              className={cn(
                "rounded-full",
                selectedType === "Mega Iate" && "gold-gradient text-aurora-black"
              )}
            >
              Mega Iates
            </Button>
            <Button
              variant={selectedType === "Super Iate" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("Super Iate")}
              className={cn(
                "rounded-full",
                selectedType === "Super Iate" && "gold-gradient text-aurora-black"
              )}
            >
              Super Iates
            </Button>
            <Button
              variant={selectedType === "Iate de Luxo" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("Iate de Luxo")}
              className={cn(
                "rounded-full",
                selectedType === "Iate de Luxo" && "gold-gradient text-aurora-black"
              )}
            >
              Iates de Luxo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Yachts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredYachts.map((yacht, index) => (
          <Card 
            key={yacht.id}
            className="group overflow-hidden border-border/50 hover-lift cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-44 sm:h-56 overflow-hidden">
              <img
                src={yacht.image}
                alt={yacht.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <Badge className="absolute top-4 left-4 bg-gold/90 text-aurora-black border-0">
                {yacht.type}
              </Badge>
              
              <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
                <Anchor className="h-3 w-3 mr-1" />
                {yacht.length}
              </Badge>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg sm:text-xl font-medium text-white mb-1">
                  {yacht.name}
                </h3>
              </div>
            </div>
            
            <CardContent className="p-5">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {yacht.guests} hóspedes
                </span>
                <span className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {yacht.cabins} cabines
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {yacht.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">a partir de</span>
                  <p className="text-lg font-semibold gold-text">{yacht.pricePerWeek}</p>
                  <span className="text-xs text-muted-foreground">/semana</span>
                </div>
                <Button size="sm" className="gold-gradient text-aurora-black hover:opacity-90">
                  Consultar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Iates;
