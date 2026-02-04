import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Snowflake, 
  MapPin, 
  Calendar,
  Mountain,
  Package,
  Shirt,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

const skiResorts = [
  "Aspen, Colorado",
  "Courchevel, França",
  "St. Moritz, Suíça",
  "Niseko, Japão",
  "Zermatt, Suíça",
  "Whistler, Canadá",
];

const equipmentPackages = [
  {
    id: 1,
    name: "Essential Ski",
    description: "Equipamento básico para esquiadores",
    image: "https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800&auto=format&fit=crop",
    includes: ["Esquis Rossignol", "Botas", "Bastões", "Capacete"],
    pricePerDay: "€ 85",
    level: "Iniciante / Intermediário",
  },
  {
    id: 2,
    name: "Premium Carving",
    description: "Performance superior para esquiadores experientes",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop",
    includes: ["Esquis Atomic Redster", "Botas Tecnica", "Bastões carbono", "Capacete POC"],
    pricePerDay: "€ 150",
    level: "Avançado",
    popular: true,
  },
  {
    id: 3,
    name: "Elite Racing",
    description: "Equipamento profissional de competição",
    image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&auto=format&fit=crop",
    includes: ["Esquis Head WC Rebels", "Botas Lange", "Bastões racing", "Capacete Briko", "Óculos Oakley"],
    pricePerDay: "€ 280",
    level: "Expert / Competição",
    elite: true,
  },
  {
    id: 4,
    name: "Snowboard Pro",
    description: "Setup completo para snowboarders",
    image: "https://images.unsplash.com/photo-1478700485868-972b69dc3e10?w=800&auto=format&fit=crop",
    includes: ["Prancha Burton Custom", "Botas Burton", "Bindings", "Capacete", "Óculos"],
    pricePerDay: "€ 130",
    level: "Todos os níveis",
  },
];

const skiWear = [
  {
    id: 1,
    name: "Conjunto Moncler Grenoble",
    category: "Vestuário",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&auto=format&fit=crop",
    includes: ["Jaqueta down", "Calça ski", "Segunda pele térmica"],
    pricePerDay: "€ 350",
    brand: "Moncler",
    elite: true,
  },
  {
    id: 2,
    name: "Kit Bogner Completo",
    category: "Vestuário",
    image: "https://images.unsplash.com/photo-1609008026542-47af68e0504f?w=800&auto=format&fit=crop",
    includes: ["Jaqueta impermeável", "Calça técnica", "Fleece", "Luvas"],
    pricePerDay: "€ 250",
    brand: "Bogner",
  },
  {
    id: 3,
    name: "Acessórios Premium",
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?w=800&auto=format&fit=crop",
    includes: ["Óculos Oakley Prizm", "Luvas aquecidas", "Balaclava", "Meias térmicas"],
    pricePerDay: "€ 95",
    brand: "Diversos",
  },
  {
    id: 4,
    name: "Après-Ski Luxe",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop",
    includes: ["Casaco pele sintética", "Botas Moon Boot", "Cachecol cashmere"],
    pricePerDay: "€ 180",
    brand: "Fendi / Loro Piana",
  },
];

const Esqui = () => {
  const [selectedResort, setSelectedResort] = useState("");
  const [activeTab, setActiveTab] = useState<"equipment" | "wear">("equipment");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-light tracking-wider gold-text mb-2 flex items-center justify-center gap-2">
          <Snowflake className="h-6 w-6" />
          Ski & Snow
        </h1>
        <p className="text-muted-foreground">
          Equipamentos e vestuário premium para suas aventuras na neve
        </p>
      </div>

      {/* Search Section */}
      <Card className="glass border-gold/10">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Estação de Esqui
              </Label>
              <div className="relative">
                <Mountain className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={selectedResort}
                  onChange={(e) => setSelectedResort(e.target.value)}
                  placeholder="Aspen, Courchevel, St. Moritz..."
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

          {/* Quick Resorts */}
          <div className="flex flex-wrap gap-2">
            {skiResorts.map((resort) => (
              <Badge 
                key={resort}
                variant="outline" 
                className="cursor-pointer hover:bg-gold/10 transition-colors"
                onClick={() => setSelectedResort(resort)}
              >
                <MapPin className="h-3 w-3 mr-1" />
                {resort}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Toggle */}
      <div className="flex justify-center gap-4">
        <Button
          variant={activeTab === "equipment" ? "default" : "outline"}
          onClick={() => setActiveTab("equipment")}
          className={cn(
            "rounded-full px-8",
            activeTab === "equipment" && "gold-gradient text-aurora-black"
          )}
        >
          <Package className="h-4 w-4 mr-2" />
          Equipamentos
        </Button>
        <Button
          variant={activeTab === "wear" ? "default" : "outline"}
          onClick={() => setActiveTab("wear")}
          className={cn(
            "rounded-full px-8",
            activeTab === "wear" && "gold-gradient text-aurora-black"
          )}
        >
          <Shirt className="h-4 w-4 mr-2" />
          Vestuário
        </Button>
      </div>

      {/* Equipment Grid */}
      {activeTab === "equipment" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentPackages.map((pkg, index) => (
            <Card 
              key={pkg.id}
              className={cn(
                "group overflow-hidden border-border/50 hover-lift cursor-pointer",
                pkg.elite && "border-gold/30 ring-1 ring-gold/20"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-primary border-0">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                )}
                {pkg.elite && (
                  <Badge className="absolute top-4 right-4 bg-gold text-aurora-black border-0">
                    Elite
                  </Badge>
                )}
                
                <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                  {pkg.level}
                </Badge>
              </div>
              
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {pkg.includes.slice(0, 3).map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                  {pkg.includes.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{pkg.includes.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold gold-text">{pkg.pricePerDay}</span>
                    <span className="text-xs text-muted-foreground">/dia</span>
                  </div>
                  <Button size="sm" className="gold-gradient text-aurora-black hover:opacity-90">
                    Reservar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Ski Wear Grid */}
      {activeTab === "wear" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skiWear.map((item, index) => (
            <Card 
              key={item.id}
              className={cn(
                "group overflow-hidden border-border/50 hover-lift cursor-pointer",
                item.elite && "border-gold/30 ring-1 ring-gold/20"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {item.elite && (
                  <Badge className="absolute top-4 right-4 bg-gold text-aurora-black border-0">
                    Luxe
                  </Badge>
                )}
                
                <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                  {item.brand}
                </Badge>
              </div>
              
              <CardContent className="p-5">
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.includes.slice(0, 2).map((inc) => (
                    <Badge key={inc} variant="secondary" className="text-xs">
                      {inc}
                    </Badge>
                  ))}
                  {item.includes.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.includes.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold gold-text">{item.pricePerDay}</span>
                    <span className="text-xs text-muted-foreground">/dia</span>
                  </div>
                  <Button size="sm" className="gold-gradient text-aurora-black hover:opacity-90">
                    Reservar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delivery Info */}
      <Card className="glass border-gold/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">Entrega no Hotel ou Chalé</h3>
          <p className="text-muted-foreground">
            Todos os equipamentos são entregues ajustados e prontos para uso no seu local de hospedagem.
            Inclui suporte técnico durante toda a estadia.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Esqui;
