import cessnaCaravan from "@/assets/aircraft/cessna-caravan.jpg";
import kingAirC90 from "@/assets/aircraft/king-air-c90.jpg";
import kingAirC90Alt from "@/assets/aircraft/king-air-c90-alt.jpg";
import kingAirB200 from "@/assets/aircraft/king-air-b200.jpg";
import senecaI from "@/assets/aircraft/seneca-i.jpg";
import senecaII from "@/assets/aircraft/seneca-ii.jpg";
import senecaV from "@/assets/aircraft/seneca-v.jpg";
import phenom300e from "@/assets/aircraft/phenom-300e.webp";
import phenom300eFlight from "@/assets/aircraft/phenom-300e-flight.avif";
import robinsonR22 from "@/assets/aircraft/robinson-r22.webp";

export interface Aircraft {
  id: number;
  name: string;
  type: string;
  image: string;
  capacity: number;
  range: string;
  features: string[];
}

export const aircrafts: Aircraft[] = [
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
    image: phenom300e,
    capacity: 8,
    range: "3,650 km",
    features: ["Cabine mais silenciosa", "Wi-Fi", "Bagageiro amplo"],
  },
  {
    id: 5,
    name: "Cessna Caravan",
    type: "Turboélice",
    image: cessnaCaravan,
    capacity: 9,
    range: "1,982 km",
    features: ["Versatilidade de pouso", "Cabine espaçosa", "Operação em pistas curtas"],
  },
  {
    id: 6,
    name: "King Air C90",
    type: "Turboélice",
    image: kingAirC90,
    capacity: 7,
    range: "2,446 km",
    features: ["Cabine pressurizada", "Conforto executivo", "Alta confiabilidade"],
  },
  {
    id: 7,
    name: "King Air B200",
    type: "Turboélice",
    image: kingAirB200,
    capacity: 9,
    range: "3,338 km",
    features: ["Velocidade de cruzeiro alta", "Cabine ampla", "Autonomia estendida"],
  },
  {
    id: 8,
    name: "Seneca I",
    type: "Bimotor Pistão",
    image: senecaI,
    capacity: 5,
    range: "1,352 km",
    features: ["Economia operacional", "Ideal para curtas distâncias", "Manutenção acessível"],
  },
  {
    id: 9,
    name: "Seneca II",
    type: "Bimotor Pistão",
    image: senecaII,
    capacity: 5,
    range: "1,463 km",
    features: ["Turbo-alimentado", "Performance aprimorada", "Cabine confortável"],
  },
  {
    id: 10,
    name: "Seneca III",
    type: "Bimotor Pistão",
    image: senecaII,
    capacity: 5,
    range: "1,520 km",
    features: ["Aviônica moderna", "Piloto automático", "Trem retrátil"],
  },
  {
    id: 11,
    name: "Seneca V",
    type: "Bimotor Pistão",
    image: senecaV,
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
    image: robinsonR22,
    capacity: 2,
    range: "463 km",
    features: ["Compacto e ágil", "Ideal para sobrevoos", "Econômico"],
  },
];
