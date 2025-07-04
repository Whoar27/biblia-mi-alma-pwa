
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
      
      <Carousel className="w-full" opts={{ loop: false }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredPlans.map((plan, index) => (
            <CarouselItem 
              key={plan.id} 
              className={`pl-2 md:pl-4 ${
                index === featuredPlans.length - 1 
                  ? 'basis-4/5 md:basis-1/2' 
                  : 'basis-4/5 md:basis-1/2'
              }`}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer rounded-2xl">
                <CardContent className="p-3">
                  <img 
                    src={plan.image} 
                    alt={plan.title}
                    className="w-full h-24 object-cover rounded-xl bg-gradient-to-br from-biblical-gold-light to-biblical-orange-light mb-2"
                  />
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
