import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shirt, 
  MapPin, 
  Calendar,
  Sun,
  Snowflake,
  Leaf,
  Flower2,
  Sparkles,
  ShoppingBag,
  ThermometerSun
} from "lucide-react";
import { cn } from "@/lib/utils";

const seasons = [
  { id: "summer", name: "Verão", icon: Sun, temp: "25°C - 35°C" },
  { id: "winter", name: "Inverno", icon: Snowflake, temp: "-5°C - 10°C" },
  { id: "spring", name: "Primavera", icon: Flower2, temp: "15°C - 25°C" },
  { id: "fall", name: "Outono", icon: Leaf, temp: "10°C - 20°C" },
];

const destinations = [
  { name: "Maldivas", season: "summer", climate: "Tropical" },
  { name: "Aspen", season: "winter", climate: "Montanha" },
  { name: "Paris", season: "spring", climate: "Temperado" },
  { name: "Toscana", season: "fall", climate: "Mediterrâneo" },
  { name: "Dubai", season: "summer", climate: "Deserto" },
  { name: "Tokyo", season: "spring", climate: "Temperado" },
];

const wardrobeCollections = {
  summer: [
    {
      id: 1,
      name: "Resort Chic",
      brand: "Loro Piana",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop",
      items: ["Camisa linho", "Bermuda", "Mocassim suede", "Chapéu panamá"],
      occasions: ["Beach club", "Almoço casual", "Passeio de iate"],
      pricePerWeek: "€ 1.200",
    },
    {
      id: 2,
      name: "Tropical Elegance",
      brand: "Brunello Cucinelli",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop",
      items: ["Vestido fluido", "Sandálias", "Bolsa palha", "Acessórios"],
      occasions: ["Jantar à beira-mar", "Eventos sunset", "Boutiques"],
      pricePerWeek: "€ 2.500",
      elite: true,
    },
    {
      id: 3,
      name: "Beach Luxe",
      brand: "Vilebrequin / Eres",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
      items: ["Maiô/Biquíni", "Saída de praia", "Óculos de sol", "Sandálias"],
      occasions: ["Praia privativa", "Piscina", "Spa"],
      pricePerWeek: "€ 800",
    },
  ],
  winter: [
    {
      id: 4,
      name: "Alpine Luxe",
      brand: "Moncler",
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&auto=format&fit=crop",
      items: ["Puffer jacket", "Calça térmica", "Botas neve", "Acessórios"],
      occasions: ["Esqui", "Passeios na neve", "Après-ski"],
      pricePerWeek: "€ 3.000",
      elite: true,
    },
    {
      id: 5,
      name: "City Winter",
      brand: "Max Mara",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop",
      items: ["Casaco lã", "Suéter cashmere", "Botas couro", "Cachecol"],
      occasions: ["Compras", "Museus", "Restaurantes"],
      pricePerWeek: "€ 1.800",
    },
    {
      id: 6,
      name: "Evening Glam",
      brand: "The Row / Bottega",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop",
      items: ["Vestido longo", "Casaco fur", "Clutch", "Joias"],
      occasions: ["Gala", "Ópera", "Reveillon"],
      pricePerWeek: "€ 5.000",
      elite: true,
    },
  ],
  spring: [
    {
      id: 7,
      name: "Garden Party",
      brand: "Zimmermann",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop",
      items: ["Vestido floral", "Sandálias", "Chapéu", "Bolsa estruturada"],
      occasions: ["Brunch", "Casamentos", "Jardins"],
      pricePerWeek: "€ 1.500",
    },
    {
      id: 8,
      name: "Smart Casual",
      brand: "Zegna",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
      items: ["Blazer desestruturado", "Camisa", "Calça chino", "Loafers"],
      occasions: ["Reuniões", "Vinícolas", "City tours"],
      pricePerWeek: "€ 1.200",
    },
  ],
  fall: [
    {
      id: 9,
      name: "Tuscan Style",
      brand: "Brunello Cucinelli",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop",
      items: ["Suéter", "Calça veludo", "Mocassim", "Lenço seda"],
      occasions: ["Degustação vinhos", "Vilarejos", "Jantares rústicos"],
      pricePerWeek: "€ 2.000",
      elite: true,
    },
    {
      id: 10,
      name: "Urban Explorer",
      brand: "Loro Piana",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop",
      items: ["Trench coat", "Suéter leve", "Jeans premium", "Tênis luxo"],
      occasions: ["Museus", "Galerias", "Cafés"],
      pricePerWeek: "€ 1.600",
    },
  ],
};

const GuardaRoupa = () => {
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedSeason, setSelectedSeason] = useState<string>("summer");

  const currentCollections = wardrobeCollections[selectedSeason as keyof typeof wardrobeCollections] || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-light tracking-wider gold-text mb-2 flex items-center justify-center gap-2">
          <Shirt className="h-6 w-6" />
          Guarda-Roupa de Viagem
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Curadoria de looks aprovados para cada destino e estação. 
          Viaje leve, chegue impecável.
        </p>
      </div>

      {/* Destination Search */}
      <Card className="glass border-gold/10">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Destino
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  placeholder="Para onde você vai?"
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Datas da Viagem
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Selecione o período"
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </div>
          </div>

          {/* Quick Destinations */}
          <div className="flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <Badge 
                key={dest.name}
                variant="outline" 
                className="cursor-pointer hover:bg-gold/10 transition-colors"
                onClick={() => {
                  setSelectedDestination(dest.name);
                  setSelectedSeason(dest.season);
                }}
              >
                <ThermometerSun className="h-3 w-3 mr-1" />
                {dest.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Season Selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {seasons.map(({ id, name, icon: Icon, temp }) => (
          <Button
            key={id}
            variant={selectedSeason === id ? "default" : "outline"}
            onClick={() => setSelectedSeason(id)}
            className={cn(
              "rounded-full",
              selectedSeason === id && "gold-gradient text-aurora-black"
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {name}
            <span className="ml-2 text-xs opacity-70">{temp}</span>
          </Button>
        ))}
      </div>

      {/* Season Info */}
      <Card className="glass border-gold/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              {selectedSeason === "summer" && <Sun className="h-5 w-5 text-gold" />}
              {selectedSeason === "winter" && <Snowflake className="h-5 w-5 text-gold" />}
              {selectedSeason === "spring" && <Flower2 className="h-5 w-5 text-gold" />}
              {selectedSeason === "fall" && <Leaf className="h-5 w-5 text-gold" />}
              <span className="font-medium">
                {seasons.find(s => s.id === selectedSeason)?.name}
              </span>
            </div>
            <span className="text-muted-foreground">
              {seasons.find(s => s.id === selectedSeason)?.temp}
            </span>
            <Badge variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              {currentCollections.length} coleções disponíveis
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCollections.map((collection, index) => (
          <Card 
            key={collection.id}
            className={cn(
              "group overflow-hidden border-border/50 hover-lift cursor-pointer",
              "elite" in collection && collection.elite && "border-gold/30 ring-1 ring-gold/20"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {"elite" in collection && collection.elite && (
                <Badge className="absolute top-4 right-4 bg-gold text-aurora-black border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Curated
                </Badge>
              )}
              
              <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                {collection.brand}
              </Badge>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-medium text-white mb-1">
                  {collection.name}
                </h3>
              </div>
            </div>
            
            <CardContent className="p-5">
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Inclui
                </p>
                <div className="flex flex-wrap gap-1">
                  {collection.items.slice(0, 3).map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                  {collection.items.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{collection.items.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Ideal para
                </p>
                <p className="text-sm text-foreground/80">
                  {collection.occasions.join(" • ")}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold gold-text">{collection.pricePerWeek}</span>
                  <span className="text-xs text-muted-foreground">/semana</span>
                </div>
                <Button size="sm" className="gold-gradient text-aurora-black hover:opacity-90">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Reservar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personal Stylist Banner */}
      <Card className="glass border-gold/10 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="p-4 rounded-full bg-gold/10">
              <Sparkles className="h-8 w-8 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Personal Stylist</h3>
              <p className="text-muted-foreground">
                Não encontrou o look perfeito? Nossa equipe de stylists pode criar uma curadoria 
                exclusiva baseada no seu itinerário, preferências e ocasiões especiais.
              </p>
            </div>
            <Button className="gold-gradient text-aurora-black whitespace-nowrap">
              Agendar Consulta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuardaRoupa;
