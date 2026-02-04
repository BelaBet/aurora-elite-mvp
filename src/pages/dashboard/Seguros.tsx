import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  CheckCircle2, 
  Heart,
  Plane,
  Briefcase,
  Sparkles,
  Phone,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const insurancePlans = [
  {
    id: 1,
    name: "Essential",
    description: "Cobertura básica para viagens curtas",
    price: "$ 150",
    period: "por viagem",
    coverage: "até $ 100.000",
    features: [
      "Despesas médicas e hospitalares",
      "Regresso sanitário",
      "Atraso de voo (até 12h)",
      "Extravio de bagagem",
    ],
    recommended: false,
  },
  {
    id: 2,
    name: "Premium",
    description: "Proteção completa para viajantes exigentes",
    price: "$ 350",
    period: "por viagem",
    coverage: "até $ 500.000",
    features: [
      "Despesas médicas ilimitadas",
      "Cancelamento de viagem",
      "Interrupção de viagem",
      "Atraso de voo (sem limite)",
      "Bagagem perdida ou roubada",
      "Cobertura para esportes",
      "Assistência jurídica",
    ],
    recommended: true,
  },
  {
    id: 3,
    name: "Elite",
    description: "A experiência definitiva em proteção de viagem",
    price: "$ 750",
    period: "por viagem",
    coverage: "Ilimitada",
    features: [
      "Cobertura médica ilimitada mundial",
      "Evacuação médica de emergência",
      "Repatriação em jato privado",
      "Concierge médico 24/7",
      "Cancelamento por qualquer motivo",
      "Proteção contra sequestro",
      "Cobertura para joias e itens de luxo",
      "Assistência VIP em aeroportos",
      "Second opinion médico",
    ],
    recommended: false,
    elite: true,
  },
];

const annualPlans = [
  {
    id: 4,
    name: "Annual Gold",
    description: "Cobertura anual para viajantes frequentes",
    price: "$ 2.500",
    period: "por ano",
    coverage: "até $ 1.000.000",
    trips: "Viagens ilimitadas",
    features: [
      "Cobertura mundial",
      "Viagens ilimitadas até 90 dias cada",
      "Família incluída",
      "Esportes radicais",
      "Equipamentos de luxo",
    ],
  },
  {
    id: 5,
    name: "Annual Platinum",
    description: "O máximo em proteção para elite travelers",
    price: "$ 8.000",
    period: "por ano",
    coverage: "Ilimitada",
    trips: "Viagens ilimitadas",
    features: [
      "Cobertura ilimitada",
      "Sem limite de duração por viagem",
      "Toda a família extendida",
      "Evacuação em jato privado",
      "Concierge pessoal 24/7",
      "Cobertura para coleções de arte",
      "Proteção de ativos",
    ],
    elite: true,
  },
];

const Seguros = () => {
  const [planType, setPlanType] = useState<"trip" | "annual">("trip");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-light tracking-wider gold-text mb-2">
          Seguro Viagem Premium
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Proteção de classe mundial para suas viagens exclusivas. 
          Viaje com a tranquilidade que você merece.
        </p>
      </div>

      {/* Plan Type Toggle */}
      <div className="flex justify-center gap-4">
        <Button
          variant={planType === "trip" ? "default" : "outline"}
          onClick={() => setPlanType("trip")}
          className={cn(
            "rounded-full px-8",
            planType === "trip" && "gold-gradient text-aurora-black"
          )}
        >
          <Plane className="h-4 w-4 mr-2" />
          Por Viagem
        </Button>
        <Button
          variant={planType === "annual" ? "default" : "outline"}
          onClick={() => setPlanType("annual")}
          className={cn(
            "rounded-full px-8",
            planType === "annual" && "gold-gradient text-aurora-black"
          )}
        >
          <Globe className="h-4 w-4 mr-2" />
          Anual
        </Button>
      </div>

      {/* Benefits Banner */}
      <Card className="glass border-gold/10">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-gold/10">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <span className="text-sm">Assistência 24/7</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-gold/10">
                <Globe className="h-5 w-5 text-gold" />
              </div>
              <span className="text-sm">Cobertura Mundial</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-gold/10">
                <Heart className="h-5 w-5 text-gold" />
              </div>
              <span className="text-sm">Sem Carência</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-gold/10">
                <Briefcase className="h-5 w-5 text-gold" />
              </div>
              <span className="text-sm">Reembolso Rápido</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      {planType === "trip" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insurancePlans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={cn(
                "relative overflow-hidden border-border/50 hover-lift transition-all",
                plan.recommended && "border-gold/50 ring-2 ring-gold/20",
                plan.elite && "bg-gradient-to-br from-gold/5 to-transparent"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-gold text-aurora-black text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Recomendado
                </div>
              )}
              {plan.elite && (
                <div className="absolute top-0 right-0 flex items-center gap-1 bg-gradient-to-r from-gold to-amber-400 text-aurora-black text-xs font-medium px-3 py-1 rounded-bl-lg">
                  <Sparkles className="h-3 w-3" />
                  Elite
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold gold-text">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    <Shield className="h-3 w-3 mr-1" />
                    Cobertura {plan.coverage}
                  </Badge>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={cn(
                    "w-full",
                    plan.recommended || plan.elite
                      ? "gold-gradient text-aurora-black hover:opacity-90"
                      : ""
                  )}
                  variant={plan.recommended || plan.elite ? "default" : "outline"}
                >
                  Contratar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {annualPlans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={cn(
                "relative overflow-hidden border-border/50 hover-lift transition-all",
                plan.elite && "border-gold/50 ring-2 ring-gold/20 bg-gradient-to-br from-gold/5 to-transparent"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.elite && (
                <div className="absolute top-0 right-0 flex items-center gap-1 bg-gradient-to-r from-gold to-amber-400 text-aurora-black text-xs font-medium px-3 py-1 rounded-bl-lg">
                  <Sparkles className="h-3 w-3" />
                  Elite
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold gold-text">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">
                      <Shield className="h-3 w-3 mr-1" />
                      {plan.coverage}
                    </Badge>
                    <Badge variant="secondary">
                      <Plane className="h-3 w-3 mr-1" />
                      {plan.trips}
                    </Badge>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={cn(
                    "w-full",
                    plan.elite
                      ? "gold-gradient text-aurora-black hover:opacity-90"
                      : ""
                  )}
                  variant={plan.elite ? "default" : "outline"}
                >
                  Contratar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Contact Banner */}
      <Card className="glass border-gold/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">Precisa de um plano personalizado?</h3>
          <p className="text-muted-foreground mb-4">
            Nossa equipe pode criar uma cobertura sob medida para suas necessidades específicas.
          </p>
          <Button className="gold-gradient text-aurora-black">
            <Phone className="h-4 w-4 mr-2" />
            Falar com Especialista
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Seguros;
