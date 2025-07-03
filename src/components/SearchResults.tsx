
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

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
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
  },
  {
    book: "Romanos",
    chapter: 8,
    verse: 28,
    text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados."
  },
  {
    book: "Filipenses",
    chapter: 4,
    verse: 13,
    text: "Todo lo puedo en Cristo que me fortalece."
  }
];

export const SearchResults = ({ query, results, onSearch }: SearchResultsProps) => {
  const [searchInput, setSearchInput] = useState(query || '');
  const [displayResults, setDisplayResults] = useState<any[]>([]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      // Simular búsqueda - en una app real esto conectaría con la base de datos
      const filtered = mockSearchResults.filter(result => 
        result.text.toLowerCase().includes(searchInput.toLowerCase()) ||
        result.book.toLowerCase().includes(searchInput.toLowerCase())
      );
      setDisplayResults(filtered);
      onSearch(searchInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
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
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Buscar versículos, palabras o referencias..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {displayResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Resultados de búsqueda ({displayResults.length})
          </h3>
          {displayResults.map((result, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">
                    {result.book} {result.chapter}:{result.verse}
                  </Badge>
                </div>
                <p className="text-base leading-relaxed">{result.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
