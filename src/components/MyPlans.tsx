
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CheckCircle, Clock } from "lucide-react";

interface UserPlan {
  id: string;
  title: string;
  image: string;
  description: string;
  progress: number;
  isCompleted: boolean;
  isRecent: boolean;
}

const userPlans: UserPlan[] = [
  {
    id: "1",
    title: "Biblia en un Año",
    image: "/placeholder.svg",
    description: "Continúa tu lectura diaria",
    progress: 12,
    isCompleted: false,
    isRecent: true
  },
  {
    id: "2",
    title: "Salmos y Proverbios",
    image: "/placeholder.svg",
    description: "Plan completado exitosamente",
    progress: 100,
    isCompleted: true,
    isRecent: false
  },
  {
    id: "3",
    title: "Evangelios",
    image: "/placeholder.svg",
    description: "Última lectura hace 2 días",
    progress: 67,
    isCompleted: false,
    isRecent: true
  }
];

export const MyPlans = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Mis Planes</h3>
      
      <Carousel className="w-full" opts={{ loop: false }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {userPlans.map((plan, index) => (
            <CarouselItem 
              key={plan.id} 
              className={`pl-2 md:pl-4 ${
                index === userPlans.length - 1 
                  ? 'basis-4/5 md:basis-1/2' 
                  : 'basis-4/5 md:basis-1/2'
              }`}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer rounded-2xl">
                <CardContent className="p-3">
                  <div className="relative mb-2">
                    <img 
                      src={plan.image} 
                      alt={plan.title}
                      className="w-full h-24 object-cover rounded-xl bg-gradient-to-br from-biblical-purple-light to-biblical-blue-light"
                    />
                    {plan.isCompleted && (
                      <Badge className="absolute top-1 right-1 bg-biblical-green text-white text-xs rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completado
                      </Badge>
                    )}
                    {plan.isRecent && !plan.isCompleted && (
                      <Badge className="absolute top-1 right-1 bg-biblical-orange text-white text-xs rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        Reciente
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {plan.description}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
