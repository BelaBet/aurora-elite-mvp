import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Wine, 
  Music, 
  Utensils,
  Ticket,
  Star,
  MapPin,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: 1,
    name: "Jantar no Noma",
    category: "Gastronomia",
    location: "Copenhagen, Dinamarca",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    description: "Experiência gastronômica no melhor restaurante do mundo",
    price: "€ 800 / pessoa",
    rating: 5.0,
    exclusive: true,
  },
  {
    id: 2,
    name: "Camarote F1 Monaco",
    category: "Eventos",
    location: "Monte Carlo, Monaco",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop",
    description: "Acesso VIP ao Grande Prêmio de Monaco com hospitalidade premium",
    price: "€ 15.000 / pessoa",
    rating: 4.9,
    exclusive: true,
  },
  {
    id: 3,
    name: "Show Privado Andrea Bocelli",
    category: "Entretenimento",
    location: "Toscana, Itália",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
    description: "Apresentação exclusiva em vinícola histórica",
    price: "€ 50.000 / grupo",
    rating: 5.0,
    exclusive: true,
  },
  {
    id: 4,
    name: "Degustação Château Margaux",
    category: "Vinhos",
    location: "Bordeaux, França",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop",
    description: "Tour privado e degustação de safras raras",
    price: "€ 2.500 / pessoa",
    rating: 4.8,
    exclusive: false,
  },
  {
    id: 5,
    name: "Fashion Week Front Row",
    category: "Moda",
    location: "Paris, França",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    description: "Acesso primeira fila aos desfiles mais exclusivos",
    price: "€ 25.000 / pessoa",
    rating: 4.9,
    exclusive: true,
  },
  {
    id: 6,
    name: "Aula com Chef Alain Ducasse",
    category: "Gastronomia",
    location: "Paris, França",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop",
    description: "Masterclass privada com lenda da culinária francesa",
    price: "€ 5.000 / pessoa",
    rating: 5.0,
    exclusive: true,
  },
  {
    id: 7,
    name: "Safari Fotográfico Exclusivo",
    category: "Aventura",
    location: "Serengeti, Tanzânia",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop",
    description: "Safari privado com guia especialista e fotógrafo profissional",
    price: "$ 8.000 / dia",
    rating: 4.9,
    exclusive: false,
  },
  {
    id: 8,
    name: "Opera Box La Scala",
    category: "Entretenimento",
    location: "Milão, Itália",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop",
    description: "Camarote privativo na ópera mais prestigiada do mundo",
    price: "€ 3.000 / camarote",
    rating: 4.8,
    exclusive: false,
  },
];

const categories = [
  { name: "Todos", icon: Sparkles },
  { name: "Gastronomia", icon: Utensils },
  { name: "Vinhos", icon: Wine },
  { name: "Entretenimento", icon: Music },
  { name: "Eventos", icon: Ticket },
];

const Experiencias = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredExperiences = selectedCategory === "Todos"
    ? experiences
    : experiences.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-light tracking-wider gold-text mb-2">
          Experiências VIP
        </h1>
        <p className="text-muted-foreground">
          Momentos únicos e inesquecíveis ao redor do mundo
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            variant={selectedCategory === name ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(name)}
            className={cn(
              "rounded-full",
              selectedCategory === name && "gold-gradient text-aurora-black"
            )}
          >
            <Icon className="h-4 w-4 mr-2" />
            {name}
          </Button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredExperiences.map((experience, index) => (
          <Card 
            key={experience.id}
            className="group overflow-hidden border-border/50 hover-lift cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={experience.image}
                alt={experience.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {experience.exclusive && (
                <Badge className="absolute top-4 right-4 bg-gold text-aurora-black border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Exclusivo
                </Badge>
              )}
              
              <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm">
                {experience.category}
              </Badge>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-medium text-white mb-1">
                  {experience.name}
                </h3>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin className="h-3 w-3" />
                  {experience.location}
                </div>
              </div>
            </div>
            
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {experience.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span className="text-sm font-medium">{experience.rating}</span>
                </div>
                <span className="text-lg font-semibold gold-text">
                  {experience.price}
                </span>
              </div>

              <Button className="w-full gold-gradient text-aurora-black hover:opacity-90">
                <Calendar className="h-4 w-4 mr-2" />
                Reservar Experiência
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Experiencias;
