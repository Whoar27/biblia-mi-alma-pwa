
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Play, Clock } from "lucide-react";

interface Plan {
  id: string;
  title: string;
  image: string;
  description: string;
  duration: string;
  rating: number;
  category: string;
}

const allPlans: Plan[] = [
  {
    id: "1",
    title: "Biblia en un Año",
    image: "/placeholder.svg",
    description: "Plan completo de lectura",
    duration: "365 días",
    rating: 4.8,
    category: "Espiritual"
  },
  {
    id: "2",
    title: "Nuevo Testamento",
    image: "/placeholder.svg",
    description: "Enfoque en Cristo",
    duration: "90 días",
    rating: 4.9,
    category: "Espiritual"
  },
  {
    id: "3",
    title: "Salmos de Paz",
    image: "/placeholder.svg",
    description: "Encuentra tranquilidad",
    duration: "30 días",
    rating: 4.7,
    category: "Emocional"
  },
  {
    id: "4",
    title: "Sabiduría Familiar",
    image: "/placeholder.svg",
    description: "Fortalece tu hogar",
    duration: "21 días",
    rating: 4.6,
    category: "Familia"
  }
];

const categories = [
  { name: "Devocional", icon: "📖" },
  { name: "Oración", icon: "🙏" },
  { name: "Esperanza", icon: "✨" },
  { name: "Sabiduría", icon: "💡" },
  { name: "Familia", icon: "👨‍👩‍👧‍👦" },
  { name: "Juventud", icon: "🌟" }
];

const filterOptions = [
  "Nuevos",
  "Relacionados", 
  "Antiguo Testamento",
  "Nuevo Testamento",
  "Populares"
];

export const EnhancedPlansSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("Nuevos");
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="find" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="my">Mis Planes</TabsTrigger>
          <TabsTrigger value="find">Encontrar</TabsTrigger>
          <TabsTrigger value="saved">Guardados</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="find" className="space-y-6">
          {/* Slider de planes principales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Planes Destacados</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {allPlans.slice(0, 3).map((plan) => (
                  <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <img 
                          src={plan.image} 
                          alt={plan.title}
                          className="w-full h-32 object-cover rounded-md bg-gradient-to-br from-biblical-purple-light to-biblical-blue-light mb-3"
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

          {/* Slider de categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.name} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <p className="text-sm font-medium">{category.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Filtros */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Filtros</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {filterOptions.map((filter) => (
                  <CarouselItem key={filter} className="basis-auto">
                    <Button
                      variant={selectedFilter === filter ? "default" : "outline"}
                      onClick={() => setSelectedFilter(filter)}
                      className="whitespace-nowrap"
                    >
                      {filter}
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Planes por categoría */}
          <div className="space-y-6">
            {["Espiritual", "Emocional", "Familia"].map((categoryName) => (
              <div key={categoryName}>
                <h3 className="text-lg font-semibold mb-4">{categoryName}</h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {allPlans
                      .filter(plan => plan.category === categoryName)
                      .map((plan) => (
                        <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex gap-3">
                                <img 
                                  src={plan.image} 
                                  alt={plan.title}
                                  className="w-16 h-16 object-cover rounded-md bg-gradient-to-br from-biblical-gold-light to-biblical-orange-light"
                                />
                                <div className="flex-1 space-y-2">
                                  <h4 className="font-semibold text-sm">{plan.title}</h4>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {plan.duration}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {renderStars(plan.rating)}
                                    <span className="text-xs text-muted-foreground ml-1">
                                      {plan.rating}
                                    </span>
                                  </div>
                                  <Button size="sm" className="w-full">
                                    <Play className="h-3 w-3 mr-1" />
                                    Iniciar
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Tus planes aparecerán aquí</p>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Planes guardados aparecerán aquí</p>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Planes completados aparecerán aquí</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
