import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const properties = [
  {
    id: 1,
    name: "Villa Serenissima",
    location: "Amalfi Coast, Itália",
    images: [
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
    ],
    capacity: 12,
    bedrooms: 6,
    price: "€15.000",
    rating: 4.9,
    badge: "Members Only",
    features: ["Infinity pool", "Chef privativo", "Heliporto"],
  },
  {
    id: 2,
    name: "Chalet Mont Blanc",
    location: "Chamonix, França",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop",
    ],
    capacity: 16,
    bedrooms: 8,
    price: "€22.000",
    rating: 5.0,
    badge: "Top Rated",
    features: ["Ski-in/ski-out", "Spa", "Adega"],
  },
  {
    id: 3,
    name: "Ocean Pavilion",
    location: "Maldives",
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&auto=format&fit=crop",
    ],
    capacity: 8,
    bedrooms: 4,
    price: "$18.000",
    rating: 4.8,
    badge: "New",
    features: ["Overwater", "Reef privativo", "Iate incluso"],
  },
  {
    id: 4,
    name: "Desert Rose Estate",
    location: "Dubai, UAE",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    ],
    capacity: 20,
    bedrooms: 10,
    price: "$45.000",
    rating: 4.9,
    badge: "Members Only",
    features: ["Estábulo privativo", "Cinema", "Pista de pouso"],
  },
  {
    id: 5,
    name: "Aspen Ridge Lodge",
    location: "Aspen, Colorado",
    images: [
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
    ],
    capacity: 14,
    bedrooms: 7,
    price: "$28.000",
    rating: 4.7,
    badge: "Top Rated",
    features: ["Hot tub", "Game room", "Ski valet"],
  },
  {
    id: 6,
    name: "Greek Isle Villa",
    location: "Santorini, Grécia",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop",
    ],
    capacity: 10,
    bedrooms: 5,
    price: "€12.000",
    rating: 4.8,
    features: ["Vista caldera", "Piscina privativa", "Wine cellar"],
  },
  {
    id: 7,
    name: "Bali Jungle Retreat",
    location: "Ubud, Bali",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop",
    ],
    capacity: 8,
    bedrooms: 4,
    price: "$8.500",
    rating: 4.9,
    badge: "New",
    features: ["Spa tradicional", "Chef balinês", "Yoga pavilion"],
  },
  {
    id: 8,
    name: "Monaco Penthouse",
    location: "Monte Carlo, Monaco",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    ],
    capacity: 6,
    bedrooms: 3,
    price: "€35.000",
    rating: 5.0,
    badge: "Members Only",
    features: ["Vista marina", "Terraço 360°", "Concierge 24h"],
  },
];

const PropertyCard = ({ property, index }: { property: typeof properties[0]; index: number }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <Card 
      className="group overflow-hidden border-border/50 hover-lift cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Carousel */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.images[currentImage]}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Carousel Controls */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    i === currentImage ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Badge */}
        {property.badge && (
          <Badge className={cn(
            "absolute top-4 left-4 border-0",
            property.badge === "Members Only" && "bg-gold/90 text-aurora-black",
            property.badge === "Top Rated" && "bg-green-500/90 text-white",
            property.badge === "New" && "bg-blue-500/90 text-white"
          )}>
            {property.badge}
          </Badge>
        )}

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-gold fill-gold" />
          <span className="text-xs text-white font-medium">{property.rating}</span>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg">{property.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {property.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {property.capacity} hóspedes
          </span>
          <span>{property.bedrooms} quartos</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs font-normal">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div>
            <span className="text-lg font-semibold gold-text">{property.price}</span>
            <span className="text-sm text-muted-foreground"> /noite</span>
          </div>
          <Button size="sm" className="gold-gradient text-aurora-black">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Hospedagem = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-light tracking-widest mb-2">HOSPEDAGEM</h1>
        <p className="text-muted-foreground text-sm">
          Propriedades exclusivas selecionadas para você
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hospedagem;
