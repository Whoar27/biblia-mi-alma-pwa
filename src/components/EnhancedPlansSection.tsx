import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Star, Play, Clock, Calendar, Book, HeartHandshake, Sparkles, Lightbulb, Users, ArrowRight, ArrowLeft } from "lucide-react";

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
  { name: "Devocional", icon: Book },
  { name: "Oración", icon: HeartHandshake },
  { name: "Esperanza", icon: Sparkles },
  { name: "Sabiduría", icon: Lightbulb },
  { name: "Familia", icon: Users },
  { name: "Juventud", icon: Star }
];

const filterOptions = [
  "Nuevos",
  "Relacionados", 
  "Antiguo Testamento",
  "Nuevo Testamento",
  "Populares"
];

function ensureMinPlans(plans, min = 3) {
  if (plans.length >= min) return plans;
  const result = [...plans];
  let i = 0;
  while (result.length < min) {
    result.push({ ...plans[i % plans.length], id: `${plans[i % plans.length].id}-copy${result.length}` });
    i++;
  }
  return result;
}

export const EnhancedPlansSection = () => {
  const [selectedTab, setSelectedTab] = useState("find");
  const [selectedFilter, setSelectedFilter] = useState("Nuevos");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategorySlider, setSelectedCategorySlider] = useState<string | null>(null);
  
  // Hook para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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

  // Filtrar planes por categoría seleccionada
  const filteredPlans = selectedCategory
    ? allPlans.filter(plan => plan.category === selectedCategory)
    : [];

  return (
    <div>
      {/* Header específico para planes */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 py-2">
        <div className="max-w-4xl mx-auto px-4">
          {/* Título y calendario con transición de opacidad y altura */}
          <div
            className={`flex items-center gap-3 mb-3 transition-all duration-300 overflow-hidden ${isScrolled ? 'opacity-0 max-h-0' : 'opacity-100 max-h-16'}`}
            style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
          >
            <Calendar className="text-biblical-purple h-6 w-6" />
            <h1 className="font-bold text-xl">Planes de Lectura</h1>
          </div>
          
          {/* Pestañas principales con estilo redondeado */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={selectedTab === tab.id ? "default" : "outline"}
                onClick={() => setSelectedTab(tab.id)}
                className="rounded-full whitespace-nowrap"
                size="sm"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Contenido con padding superior para el header fijo */}
      <div className="pt-32 p-4">
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
                          ? 'basis-[38%] md:basis-1/3 lg:basis-1/4' 
                          : 'basis-[38%] md:basis-1/3 lg:basis-1/4'
                      }`}
                    >
                      <Card className="hover:shadow-md transition-shadow cursor-pointer rounded-2xl" onClick={() => setSelectedCategorySlider(category.name)}>
                        <CardContent className="p-4 text-center">
                          <category.icon className="mx-auto mb-2 text-biblical-purple" style={{ fontSize: 22, height: 22, width: 22 }} />
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
              {["Espiritual", "Emocional", "Familia"].map((categoryName) => {
                let planesCategoria = allPlans.filter(plan => plan.category === categoryName);
                planesCategoria = ensureMinPlans(planesCategoria, 6); // Aseguramos al menos 6 para 2 columnas
                // Agrupar en columnas de 3
                const columns = [];
                for (let i = 0; i < planesCategoria.length; i += 3) {
                  columns.push(planesCategoria.slice(i, i + 3));
                }
                if (columns.length === 0) return null;
                return (
                  <div key={categoryName} className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">{categoryName}</h3>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                        VER TODOS <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="overflow-x-auto pb-2">
                      <div className="flex gap-4 min-w-max">
                        {columns.map((col, colIdx) => (
                          <div
                            key={colIdx}
                            className="bg-white rounded-lg shadow-sm p-2 flex flex-col gap-3"
                            style={{ minWidth: '85vw', maxWidth: '85vw', marginRight: colIdx === columns.length - 1 ? 0 : -10 }}
                          >
                            {col.map((plan) => (
                              <div key={plan.id} className="flex items-center gap-3 mb-1">
                                <img src={plan.image} alt={plan.title} className="w-14 h-14 rounded-lg object-cover bg-gray-100" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[11px] text-gray-500 font-semibold">{plan.duration}</span>
                                  </div>
                                  <div className="font-medium truncate text-sm mb-0.5">{plan.title}</div>
                                  <div className="flex items-center gap-1 mb-0.5">
                                    {[1,2,3,4,5].map(i => (
                                      <Star key={i} className={`h-3 w-3 ${i <= Math.round(plan.rating) ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-full bg-gray-100 font-bold text-black px-4 py-1 text-xs shadow-none">
                                  Inicio
                                </Button>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
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

        {/* Si hay categoría seleccionada, muestro la vista de la categoría */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)} className="p-1">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold ml-2">{selectedCategory}</h2>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                VER TODOS <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {filteredPlans.map((plan) => (
                <div key={plan.id} className="flex items-center gap-4 mb-6">
                  <img src={plan.image} alt={plan.title} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-semibold">{plan.duration}</span>
                    </div>
                    <div className="font-medium truncate text-base mb-1">{plan.title}</div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`h-4 w-4 ${i <= Math.round(plan.rating) ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full bg-gray-100 font-bold text-black px-6 py-2 text-base shadow-none">
                    Inicio
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pantalla completa al seleccionar categoría del slider */}
        {selectedCategorySlider && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex items-center p-4 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedCategorySlider(null)}
                className="mr-2 rounded-full w-10 h-10 flex items-center justify-center"
                style={{ minWidth: 40, minHeight: 40 }}
                aria-label="Volver"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="flex-1 text-center text-2xl font-bold -ml-8">{selectedCategorySlider}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center gap-3 mb-1">
                  <img src="/placeholder.svg" alt="Plan" className="w-14 h-14 rounded-lg object-cover bg-gray-100" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] text-gray-500 font-semibold">{3 + i} Días</span>
                    </div>
                    <div className="font-medium truncate text-sm mb-0.5">Plan de {selectedCategorySlider} {i}</div>
                    <div className="flex items-center gap-1 mb-0.5">
                      {[1,2,3,4,5].map(j => (
                        <Star key={j} className={`h-3 w-3 ${j <= 4 ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full bg-gray-100 font-bold text-black px-4 py-1 text-xs shadow-none">
                    Inicio
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
