
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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
  const [selectedTab, setSelectedTab] = useState("find");
  const [selectedFilter, setSelectedFilter] = useState("Nuevos");
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const tabs = [
    { id: "my", label: "Mis Planes" },
    { id: "find", label: "Encontrar" },
    { id: "saved", label: "Guardados" },
    { id: "completed", label: "Completados" }
  ];

  return (
    <div className="p-4">
      {/* Pestañas principales con estilo redondeado */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={selectedTab === tab.id ? "default" : "outline"}
            onClick={() => setSelectedTab(tab.id)}
            className="rounded-full whitespace-nowrap"
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      {selectedTab === "find" && (
        <div className="space-y-6">
          {/* Slider de planes principales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Planes Destacados</h3>
            <Carousel className="w-full" opts={{ loop: false }}>
              <CarouselContent>
                {allPlans.slice(0, 3).map((plan, index) => (
                  <CarouselItem 
                    key={plan.id} 
                    className={`${
                      index === allPlans.slice(0, 3).length - 1 
                        ? 'basis-4/5 md:basis-1/2 lg:basis-1/3' 
                        : 'basis-4/5 md:basis-1/2 lg:basis-1/3'
                    }`}
                  >
                    <Card className="hover:shadow-md transition-shadow rounded-2xl">
                      <CardContent className="p-4">
                        <img 
                          src={plan.image} 
                          alt={plan.title}
                          className="w-full h-32 object-cover rounded-xl bg-gradient-to-br from-biblical-purple-light to-biblical-blue-light mb-3"
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

          {/* Slider de categorías */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorías</h3>
            <Carousel className="w-full" opts={{ loop: false }}>
              <CarouselContent>
                {categories.map((category, index) => (
                  <CarouselItem 
                    key={category.name} 
                    className={`${
                      index === categories.length - 1 
                        ? 'basis-1/2 md:basis-1/3 lg:basis-1/4' 
                        : 'basis-1/2 md:basis-1/3 lg:basis-1/4'
                    }`}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer rounded-2xl">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <p className="text-sm font-medium">{category.name}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Filtros con estilo redondeado */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Filtros</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter)}
                  className="rounded-full whitespace-nowrap"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Planes por categoría */}
          <div className="space-y-6">
            {["Espiritual", "Emocional", "Familia"].map((categoryName) => (
              <div key={categoryName}>
                <h3 className="text-lg font-semibold mb-4">{categoryName}</h3>
                <Carousel className="w-full" opts={{ loop: false }}>
                  <CarouselContent>
                    {allPlans
                      .filter(plan => plan.category === categoryName)
                      .map((plan, index, filteredPlans) => (
                        <CarouselItem 
                          key={plan.id} 
                          className={`${
                            index === filteredPlans.length - 1 
                              ? 'basis-4/5 md:basis-1/2 lg:basis-1/3' 
                              : 'basis-4/5 md:basis-1/2 lg:basis-1/3'
                          }`}
                        >
                          <Card className="hover:shadow-md transition-shadow rounded-2xl">
                            <CardContent className="p-4">
                              <div className="flex gap-3">
                                <img 
                                  src={plan.image} 
                                  alt={plan.title}
                                  className="w-16 h-16 object-cover rounded-xl bg-gradient-to-br from-biblical-gold-light to-biblical-orange-light"
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
                                  <Button size="sm" className="w-full rounded-full">
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
                </Carousel>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === "my" && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Tus planes aparecerán aquí</p>
        </div>
      )}

      {selectedTab === "saved" && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Planes guardados aparecerán aquí</p>
        </div>
      )}

      {selectedTab === "completed" && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Planes completados aparecerán aquí</p>
        </div>
      )}
    </div>
  );
};
