
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface FeaturedPlan {
  id: string;
  title: string;
  image: string;
  description: string;
}

const featuredPlans: FeaturedPlan[] = [
  {
    id: "1",
    title: "Nuevo Testamento en 90 días",
    image: "/placeholder.svg",
    description: "Enfócate en el mensaje de Cristo"
  },
  {
    id: "2",
    title: "Salmos de Esperanza",
    image: "/placeholder.svg",
    description: "Encuentra paz en los salmos"
  },
  {
    id: "3",
    title: "Sabiduría de Proverbios",
    image: "/placeholder.svg",
    description: "Principios para la vida diaria"
  },
  {
    id: "4",
    title: "Promesas de Dios",
    image: "/placeholder.svg",
    description: "Descubre las promesas bíblicas"
  }
];

export const FeaturedPlans = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Planes Destacados</h3>
      
      <Carousel className="w-full max-w-sm mx-auto md:max-w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredPlans.map((plan) => (
            <CarouselItem key={plan.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-3">
                  <img 
                    src={plan.image} 
                    alt={plan.title}
                    className="w-full h-24 object-cover rounded-md bg-gradient-to-br from-biblical-gold-light to-biblical-orange-light mb-2"
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    {plan.description}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
