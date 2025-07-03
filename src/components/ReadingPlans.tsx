
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  totalDays: number;
  currentDay: number;
  isActive: boolean;
  readings: string[];
}

const samplePlans: ReadingPlan[] = [
  {
    id: "1",
    title: "Biblia en un Año",
    description: "Lee toda la Biblia siguiendo un plan estructurado de 365 días",
    duration: "365 días",
    progress: 12,
    totalDays: 365,
    currentDay: 43,
    isActive: true,
    readings: ["Génesis 1-3", "Mateo 1-2", "Salmos 1"]
  },
  {
    id: "2",
    title: "Nuevo Testamento en 90 días",
    description: "Enfócate en el Nuevo Testamento con lecturas diarias organizadas",
    duration: "90 días",
    progress: 0,
    totalDays: 90,
    currentDay: 0,
    isActive: false,
    readings: ["Mateo 1-4", "Salmos 1-2"]
  },
  {
    id: "3",
    title: "Salmos y Proverbios",
    description: "Sabiduría diaria con un salmo y un proverbio cada día",
    duration: "31 días",
    progress: 67,
    totalDays: 31,
    currentDay: 21,
    isActive: false,
    readings: ["Salmos 21", "Proverbios 21"]
  },
  {
    id: "4",
    title: "Evangelios",
    description: "Conoce mejor a Jesús leyendo los cuatro evangelios",
    duration: "30 días",
    progress: 0,
    totalDays: 30,
    currentDay: 0,
    isActive: false,
    readings: ["Mateo 1-2", "Marcos 1"]
  }
];

export const ReadingPlans = () => {
  const [plans, setPlans] = useState<ReadingPlan[]>(samplePlans);
  const { toast } = useToast();

  const startPlan = (planId: string) => {
    setPlans(plans.map(plan => ({
      ...plan,
      isActive: plan.id === planId ? true : plan.isActive
    })));
    
    toast({
      title: "Plan iniciado",
      description: "¡Comenzaste un nuevo plan de lectura!"
    });
  };

  const markDayComplete = (planId: string) => {
    setPlans(plans.map(plan => {
      if (plan.id === planId && plan.isActive) {
        const newCurrentDay = Math.min(plan.currentDay + 1, plan.totalDays);
        const newProgress = Math.round((newCurrentDay / plan.totalDays) * 100);
        
        return {
          ...plan,
          currentDay: newCurrentDay,
          progress: newProgress
        };
      }
      return plan;
    }));
    
    toast({
      title: "¡Día completado!",
      description: "Excelente progreso en tu plan de lectura"
    });
  };

  const activePlan = plans.find(plan => plan.isActive);

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Planes de Lectura</h2>
        <p className="text-muted-foreground">
          Sigue un plan estructurado para leer la Biblia de manera organizada
        </p>
      </div>

      {activePlan && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Plan Activo</CardTitle>
            </div>
            <h3 className="text-xl font-semibold">{activePlan.title}</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Día {activePlan.currentDay} de {activePlan.totalDays}</span>
                  <span>{activePlan.progress}% completado</span>
                </div>
                <Progress value={activePlan.progress} className="h-2" />
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Lectura de hoy:</h4>
                <div className="space-y-1">
                  {activePlan.readings.map((reading, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-1">
                      {reading}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => markDayComplete(activePlan.id)}
                className="w-full"
                disabled={activePlan.currentDay >= activePlan.totalDays}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar día como completado
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Planes Disponibles</h3>
        
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.isActive ? "opacity-50" : "hover:shadow-md transition-shadow"}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{plan.title}</h4>
                  <p className="text-muted-foreground text-sm mb-2">{plan.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {plan.duration}
                    </div>
                    {plan.progress > 0 && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {plan.progress}% completado
                      </div>
                    )}
                  </div>
                </div>
                
                {!plan.isActive && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => startPlan(plan.id)}
                  >
                    {plan.progress > 0 ? 'Continuar' : 'Iniciar'}
                  </Button>
                )}
                
                {plan.isActive && (
                  <Badge variant="default">Activo</Badge>
                )}
              </div>
              
              {plan.progress > 0 && (
                <div className="mt-3">
                  <Progress value={plan.progress} className="h-1" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
