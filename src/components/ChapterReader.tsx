
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChapterReaderProps {
  book: string;
  chapter: number;
  onChapterChange: (chapter: number) => void;
}

// Datos de ejemplo para demostrar la funcionalidad
const sampleVerses = {
  "Génesis": {
    1: [
      { verse: 1, text: "En el principio creó Dios los cielos y la tierra." },
      { verse: 2, text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas." },
      { verse: 3, text: "Y dijo Dios: Sea la luz; y fue la luz." },
      { verse: 4, text: "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas." },
      { verse: 5, text: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día." }
    ]
  },
  "Juan": {
    1: [
      { verse: 1, text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios." },
      { verse: 2, text: "Este era en el principio con Dios." },
      { verse: 3, text: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho." },
      { verse: 4, text: "En él estaba la vida, y la vida era la luz de los hombres." },
      { verse: 5, text: "La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella." }
    ]
  }
};

export const ChapterReader = ({ book, chapter, onChapterChange }: ChapterReaderProps) => {
  const [verses, setVerses] = useState<{ verse: number; text: string }[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    // Simular carga de versículos
    const bookData = sampleVerses[book as keyof typeof sampleVerses];
    if (bookData && bookData[chapter as keyof typeof bookData]) {
      setVerses(bookData[chapter as keyof typeof bookData]);
    } else {
      // Generar versículos de ejemplo si no hay datos específicos
      setVerses([
        { verse: 1, text: `Este es el versículo 1 del capítulo ${chapter} de ${book}.` },
        { verse: 2, text: `Este es el versículo 2 del capítulo ${chapter} de ${book}.` },
        { verse: 3, text: `Este es el versículo 3 del capítulo ${chapter} de ${book}.` }
      ]);
    }
  }, [book, chapter]);

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

  const shareVerse = (verse: { verse: number; text: string }) => {
    if (navigator.share) {
      navigator.share({
        title: `${book} ${chapter}:${verse.verse}`,
        text: verse.text
      });
    } else {
      navigator.clipboard.writeText(`${book} ${chapter}:${verse.verse} - ${verse.text}`);
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
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{book} {chapter}</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onChapterChange(Math.max(1, chapter - 1))}
                disabled={chapter <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onChapterChange(chapter + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verses.map((verse) => {
              const verseKey = `${book}-${chapter}-${verse.verse}`;
              const isFavorite = favorites.has(verseKey);
              
              return (
                <div key={verse.verse} className="flex gap-2 group">
                  <Badge variant="outline" className="shrink-0 mt-1">
                    {verse.verse}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">{verse.text}</p>
                    <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        onClick={() => shareVerse(verse)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
