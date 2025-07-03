
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Heart, Share2, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchResultsProps {
  query: string;
  results: any[];
  onSearch: (query: string) => void;
}

const mockSearchResults = [
  {
    book: "Juan",
    chapter: 3,
    verse: 16,
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
    category: "salvación"
  },
  {
    book: "Romanos",
    chapter: 8,
    verse: 28,
    text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
    category: "esperanza"
  },
  {
    book: "Filipenses",
    chapter: 4,
    verse: 13,
    text: "Todo lo puedo en Cristo que me fortalece.",
    category: "fortaleza"
  },
  {
    book: "Salmos",
    chapter: 23,
    verse: 1,
    text: "Jehová es mi pastor; nada me faltará.",
    category: "confianza"
  },
  {
    book: "1 Juan",
    chapter: 4,
    verse: 19,
    text: "Nosotros le amamos a él, porque él nos amó primero.",
    category: "amor"
  },
  {
    book: "Proverbios",
    chapter: 3,
    verse: 5,
    text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
    category: "sabiduría"
  }
];

const popularSearches = [
  "amor", "esperanza", "fe", "salvación", "perdón", "paz", "sabiduría", "fortaleza"
];

const categories = [
  "Todos", "salvación", "amor", "esperanza", "fortaleza", "confianza", "sabiduría"
];

export const SearchResults = ({ query, results, onSearch }: SearchResultsProps) => {
  const [searchInput, setSearchInput] = useState(query || '');
  const [displayResults, setDisplayResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleSearch = (searchTerm?: string) => {
    const term = searchTerm || searchInput;
    if (term.trim()) {
      const filtered = mockSearchResults.filter(result => 
        result.text.toLowerCase().includes(term.toLowerCase()) ||
        result.book.toLowerCase().includes(term.toLowerCase()) ||
        result.category.toLowerCase().includes(term.toLowerCase())
      );
      setDisplayResults(filtered);
      onSearch(term);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "Todos") {
      setDisplayResults(mockSearchResults);
    } else {
      const filtered = mockSearchResults.filter(result => 
        result.category === category
      );
      setDisplayResults(filtered);
    }
  };

  const toggleFavorite = (verseKey: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(verseKey)) {
      newFavorites.delete(verseKey);
      toast({
        title: "Versículo removido",
        description: "El versículo fue removido de favoritos"
      });
    } else {
      newFavorites.add(verseKey);
      toast({
        title: "Versículo guardado",
        description: "El versículo fue agregado a favoritos"
      });
    }
    setFavorites(newFavorites);
  };

  const shareVerse = (verse: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${verse.book} ${verse.chapter}:${verse.verse}`,
        text: verse.text
      });
    } else {
      navigator.clipboard.writeText(`${verse.book} ${verse.chapter}:${verse.verse} - ${verse.text}`);
      toast({
        title: "Copiado",
        description: "El versículo fue copiado al portapapeles"
      });
    }
  };

  return (
    <div className="p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar en las Escrituras
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Buscar versículos, palabras o referencias..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={() => handleSearch()}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {!searchInput && (
            <div>
              <p className="text-sm font-medium mb-2">Búsquedas populares:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setSearchInput(term);
                      handleSearch(term);
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="results">Resultados</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
        
        <TabsContent value="results">
          {displayResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filtrar por:</span>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold">
                Resultados ({displayResults.length})
              </h3>
              
              {displayResults.map((result, index) => {
                const verseKey = `${result.book}-${result.chapter}-${result.verse}`;
                const isFavorite = favorites.has(verseKey);
                
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">
                          {result.book} {result.chapter}:{result.verse}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                      </div>
                      <p className="text-base leading-relaxed mb-3">{result.text}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(verseKey)}
                          className={isFavorite ? "text-red-500" : ""}
                        >
                          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => shareVerse(result)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="categories">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.slice(1).map((category) => {
              const categoryCount = mockSearchResults.filter(r => r.category === category).length;
              return (
                <Card 
                  key={category}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    handleCategoryFilter(category);
                    // Switch to results tab
                    const tabsElement = document.querySelector('[data-state="active"]');
                    if (tabsElement) {
                      const resultsTab = document.querySelector('[value="results"]') as HTMLElement;
                      resultsTab?.click();
                    }
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold capitalize">{category}</h3>
                    <p className="text-sm text-muted-foreground">{categoryCount} versículos</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {searchInput && displayResults.length === 0 && query && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No se encontraron resultados para "{searchInput}"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Intenta con otras palabras clave o frases
          </p>
        </div>
      )}

      {!searchInput && !query && (
        <div className="text-center py-8">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Ingresa una palabra o frase para buscar en las Escrituras
          </p>
        </div>
      )}
    </div>
  );
};
