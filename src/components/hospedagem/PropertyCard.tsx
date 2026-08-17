import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Property } from "@/data/properties";

const PropertyCard = ({ property, index }: { property: Property; index: number }) => {
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
      <div className="relative h-44 sm:h-56 overflow-hidden">
        <img
          src={property.images[currentImage]}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

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

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {property.badge && (
          <Badge
            className={cn(
              "absolute top-4 left-4 border-0",
              property.badge === "Members Only" && "bg-gold/90 text-aurora-black",
              property.badge === "Top Rated" && "bg-green-500/90 text-white",
              property.badge === "New" && "bg-blue-500/90 text-white"
            )}
          >
            {property.badge}
          </Badge>
        )}

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

export default PropertyCard;
