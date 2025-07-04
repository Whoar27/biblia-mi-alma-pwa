
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Clock, Heart } from "lucide-react";

interface SearchRecommendation {
  id: string;
  title: string;
  type: 'verse' | 'topic' | 'plan';
  content: string;
  reference?: string;
  trending?: boolean;
}

const recommendations: SearchRecommendation[] = [
  {
    id: "1",
    title: "Versículo del día",
    type: "verse",
    content: "Porque de tal manera amó Dios al mundo...",
    reference: "Juan 3:16",
    trending: true
  },
  {
    id: "2",
    title: "Esperanza",
    type: "topic",
    content: "Versículos sobre esperanza y fe",
    trending: true
  },
  {
    id: "3",
    title: "Amor de Dios",
    type: "topic",
    content: "Descubre el amor incondicional de Dios"
  },
  {
    id: "4",
    title: "Oración del Padre Nuestro",
    type: "verse",
    content: "Padre nuestro que estás en los cielos...",
    reference: "Mateo 6:9-13"
  },
  {
    id: "5",
    title: "Plan de Salmos",
    type: "plan",
    content: "31 días de sabiduría y alabanza"
  }
];

const trendingSearches = [
  "Juan 3:16", "Salmo 23", "Filipenses 4:13", "Amor", "Esperanza", "Fe", "Paz", "Sabiduría"
];

export const EnhancedSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches] = useState<string[]>(["Juan 3:16", "Salmo 23", "Esperanza"]);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Barra de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar versículos, temas, planes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-3 text-base"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Button 
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          size="sm"
        >
          Buscar
        </Button>
      </div>

      {/* Búsquedas recientes */}
      {recentSearches.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Búsquedas recientes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-biblical-purple-light"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Tendencias */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-biblical-orange" />
          <h3 className="text-sm font-medium">Tendencias</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((search, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer hover:bg-biblical-orange-light border-biblical-orange text-biblical-orange"
              onClick={() => setSearchQuery(search)}
            >
              {search}
            </Badge>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="h-4 w-4 text-biblical-red" />
          <h3 className="text-lg font-semibold">Recomendaciones para ti</h3>
        </div>
        <div className="grid gap-3">
          {recommendations.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      {item.trending && (
                        <Badge variant="secondary" className="text-xs bg-biblical-orange text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                    {item.reference && (
                      <Badge variant="outline" className="text-xs">
                        {item.reference}
                      </Badge>
                    )}
                  </div>
                  <Badge
                    variant={item.type === 'verse' ? 'default' : item.type === 'topic' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {item.type === 'verse' ? 'Versículo' : item.type === 'topic' ? 'Tema' : 'Plan'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
