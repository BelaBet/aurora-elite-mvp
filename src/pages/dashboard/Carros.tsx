import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Car, 
  MapPin, 
  Users, 
  Gauge,
  Calendar,
  Fuel
} from "lucide-react";
import { cn } from "@/lib/utils";

const cars = [
  {
    id: 1,
    name: "Rolls-Royce Phantom",
    category: "Ultra Luxo",
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop",
    seats: 4,
    transmission: "Automático",
    features: ["Motorista incluído", "Champagne bar", "Teto estrelado"],
    pricePerDay: "R$ 15.000",
  },
  {
    id: 2,
    name: "Bentley Continental GT",
    category: "Luxo",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop",
    seats: 4,
    transmission: "Automático",
    features: ["Interior em couro", "Sistema de som Naim", "Modo esportivo"],
    pricePerDay: "R$ 8.500",
  },
  {
    id: 3,
    name: "Ferrari 488 Spider",
    category: "Esportivo",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop",
    seats: 2,
    transmission: "Automático",
    features: ["Conversível", "V8 Twin-Turbo", "Launch control"],
    pricePerDay: "R$ 12.000",
  },
  {
    id: 4,
    name: "Lamborghini Huracán",
    category: "Esportivo",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop",
    seats: 2,
    transmission: "Automático",
    features: ["V10 640cv", "All-wheel drive", "Portas tesoura"],
    pricePerDay: "R$ 14.000",
  },
  {
    id: 5,
    name: "Mercedes-Maybach S680",
    category: "Ultra Luxo",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop",
    seats: 4,
    transmission: "Automático",
    features: ["Massagem nos bancos", "Separação executiva", "Refrigerador"],
    pricePerDay: "R$ 10.000",
  },
  {
    id: 6,
    name: "Porsche 911 Turbo S",
    category: "Esportivo",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop",
    seats: 4,
    transmission: "PDK",
    features: ["650cv", "0-100 em 2.7s", "Sport Chrono"],
    pricePerDay: "R$ 9.000",
  },
  {
    id: 7,
    name: "Aston Martin DB11",
    category: "Luxo",
    image: "https://images.unsplash.com/photo-1596768576356-c37b5a9c26d3?w=800&auto=format&fit=crop",
    seats: 4,
    transmission: "Automático",
    features: ["V12 biturbo", "Bang & Olufsen", "Bridge of Weir leather"],
    pricePerDay: "R$ 11.000",
  },
  {
    id: 8,
    name: "Range Rover SVAutobiography",
    category: "SUV Luxo",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop",
    seats: 5,
    transmission: "Automático",
    features: ["Suspensão a ar", "4 zonas de clima", "Terrain Response"],
    pricePerDay: "R$ 7.500",
  },
];

const categories = ["Todos", "Ultra Luxo", "Luxo", "Esportivo", "SUV Luxo"];

const Carros = () => {
  const [location, setLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredCars = selectedCategory === "Todos"
    ? cars
    : cars.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search Section */}
      <Card className="glass border-gold/10">
        <CardContent className="p-6">
          <h2 className="text-lg font-light tracking-wider mb-6 gold-text">
            Locação de Veículos Premium
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs tracking-wider uppercase text-muted-foreground">
                Local de Retirada
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="São Paulo, Monaco, Dubai..."
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

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full",
                  selectedCategory === category && "gold-gradient text-aurora-black"
                )}
              >
                {category === "Todos" && <Car className="h-4 w-4 mr-2" />}
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((car, index) => (
          <Card 
            key={car.id}
            className="group overflow-hidden border-border/50 hover-lift cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className={cn(
                "absolute top-4 left-4 border-0",
                car.category === "Ultra Luxo" 
                  ? "bg-gold text-aurora-black" 
                  : car.category === "Esportivo"
                  ? "bg-destructive text-white"
                  : "bg-primary/90"
              )}>
                {car.category}
              </Badge>
            </div>
            
            <CardContent className="p-5">
              <h3 className="text-lg font-medium mb-2">{car.name}</h3>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {car.seats} lugares
                </span>
                <span className="flex items-center gap-1">
                  <Gauge className="h-4 w-4" />
                  {car.transmission}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {car.features.slice(0, 2).map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">a partir de</span>
                  <p className="text-lg font-semibold gold-text">{car.pricePerDay}</p>
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
    </div>
  );
};

export default Carros;
