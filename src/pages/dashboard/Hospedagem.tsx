import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Flag, Hotel, TreePalm, Home } from "lucide-react";
import PropertyCard from "@/components/hospedagem/PropertyCard";
import {
  internationalProperties,
  nationalHotels,
  nationalResorts,
  nationalBeachHouses,
  Property,
} from "@/data/properties";

type NationalFilter = "todos" | "hotel" | "resort" | "casa";

const nationalAll = [...nationalHotels, ...nationalResorts, ...nationalBeachHouses];

const filterMap: Record<NationalFilter, Property[]> = {
  todos: nationalAll,
  hotel: nationalHotels,
  resort: nationalResorts,
  casa: nationalBeachHouses,
};

const filterLabels: { key: NationalFilter; label: string; icon: typeof Hotel }[] = [
  { key: "todos", label: "Todos", icon: Flag },
  { key: "hotel", label: "Hotéis", icon: Hotel },
  { key: "resort", label: "Resorts", icon: TreePalm },
  { key: "casa", label: "Casas de Praia", icon: Home },
];

const PropertyGrid = ({ properties }: { properties: Property[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {properties.map((property, index) => (
      <PropertyCard key={property.id} property={property} index={index} />
    ))}
  </div>
);

const Hospedagem = () => {
  const [nationalFilter, setNationalFilter] = useState<NationalFilter>("todos");

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-light tracking-widest mb-2">HOSPEDAGEM</h1>
        <p className="text-muted-foreground text-sm">
          Propriedades exclusivas selecionadas para você
        </p>
      </div>

      {/* Tabs: Nacional / Internacional */}
      <Tabs defaultValue="nacional" className="w-full">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="nacional" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Nacional
          </TabsTrigger>
          <TabsTrigger value="internacional" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Internacional
          </TabsTrigger>
        </TabsList>

        {/* Nacional */}
        <TabsContent value="nacional" className="space-y-6 mt-6">
          {/* Sub-filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {filterLabels.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setNationalFilter(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  nationalFilter === key
                    ? "bg-gold/20 text-gold border border-gold/40"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                  {filterMap[key].length}
                </Badge>
              </button>
            ))}
          </div>

          <PropertyGrid properties={filterMap[nationalFilter]} />
        </TabsContent>

        {/* Internacional */}
        <TabsContent value="internacional" className="mt-6">
          <PropertyGrid properties={internationalProperties} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Hospedagem;
