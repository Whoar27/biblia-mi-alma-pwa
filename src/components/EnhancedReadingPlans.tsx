
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Star, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  rating: number;
  categories: string[];
  participants: number;
  cover: string;
  color: string;
  progress?: number;
  isActive?: boolean;
}

const featuredPlans: ReadingPlan[] = [
  {
    id: "1",
    title: "Biblia en un Año",
    description: "Plan completo para leer toda la Biblia en 365 días con reflexiones diarias",
    duration: "365 días",
    rating: 4.8,
    categories: ["Completo", "Diario", "Reflexión"],
    participants: 15420,
    cover: "/placeholder.svg",
    color: "biblical-purple"
  },
  {
    id: "2",
    title: "Evangelios Profundos",
    description: "Estudio detallado de los cuatro evangelios con contexto histórico",
    duration: "90 días",
    rating: 4.9,
    categories: ["Evangelios", "Estudio", "Historia"],
    participants: 8340,
    cover: "/placeholder.svg",
    color: "biblical-blue"
  },
  {
    id: "3",
    title: "Sabiduría Diaria",
    description: "Proverbios y Salmos para inspiración y sabiduría cada día",
    duration: "31 días",
    rating: 4.7,
    categories: ["Sabiduría", "Inspiración", "Diario"],
    participants: 12180,
    cover: "/placeholder.svg",
    color: "biblical-gold"
  }
];

export const EnhancedReadingPlans = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { toast } = useToast();
  const plansPerPage = 3;
  const totalPages = Math.ceil(featuredPlans.length / plansPerPage);

  const startPlan = (planId: string) => {
    toast({
      title: "Plan iniciado",
      description: "¡Comenzaste un nuevo plan de lectura!"
    });
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentPlans = () => {
    const start = currentPage * plansPerPage;
    return featuredPlans.slice(start, start + plansPerPage);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'fill-biblical-gold text-biblical-gold' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Planes Destacados</h3>
          <p className="text-muted-foreground">Los más completados por nuestra comunidad</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevPage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextPage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {getCurrentPlans().map((plan) => (
          <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`w-24 h-32 bg-gradient-to-br from-${plan.color} to-${plan.color}-light flex items-center justify-center`}>
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{plan.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {renderStars(plan.rating)}
                          <span className="text-sm text-muted-foreground ml-1">
                            {plan.rating}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {plan.participants.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button onClick={() => startPlan(plan.id)} size="sm">
                      Iniciar Plan
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {plan.duration}
                    </div>
                    
                    <div className="flex gap-1">
                      {plan.categories.slice(0, 2).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {plan.progress && (
                    <div className="mt-3">
                      <Progress value={plan.progress} className="h-1" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(i)}
            className="w-8 h-8 p-0"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};
