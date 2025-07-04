import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, Heart, Share2, BookOpen, Type, Settings, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChapterReaderProps {
  book: string;
  chapter: number;
  onChapterChange: (chapter: number) => void;
}

const sampleVerses = {
  "Génesis": {
    1: [
      { verse: 1, text: "En el principio creó Dios los cielos y la tierra." },
      { verse: 2, text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas." },
      { verse: 3, text: "Y dijo Dios: Sea la luz; y fue la luz." },
      { verse: 4, text: "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas." },
      { verse: 5, text: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día." },
      { verse: 6, text: "Luego dijo Dios: Haya expansión en medio de las aguas, y separe las aguas de las aguas." },
      { verse: 7, text: "E hizo Dios la expansión, y separó las aguas que estaban debajo de la expansión, de las aguas que estaban sobre la expansión. Y fue así." },
      { verse: 8, text: "Y llamó Dios a la expansión Cielos. Y fue la tarde y la mañana el día segundo." },
      { verse: 9, text: "Dijo también Dios: Júntense las aguas que están debajo de los cielos en un lugar, y descúbrase lo seco. Y fue así." },
      { verse: 10, text: "Y llamó Dios a lo seco Tierra, y a la reunión de las aguas llamó Mares. Y vio Dios que era bueno." }
    ]
  },
  "Juan": {
    1: [
      { verse: 1, text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios." },
      { verse: 2, text: "Este era en el principio con Dios." },
      { verse: 3, text: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho." },
      { verse: 4, text: "En él estaba la vida, y la vida era la luz de los hombres." },
      { verse: 5, text: "La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella." },
      { verse: 6, text: "Hubo un hombre enviado de Dios, el cual se llamaba Juan." },
      { verse: 7, text: "Este vino por testimonio, para que diese testimonio de la luz, a fin de que todos creyesen por él." },
      { verse: 8, text: "No era él la luz, sino para que diese testimonio de la luz." },
      { verse: 9, text: "Aquella luz verdadera, que alumbra a todo hombre, venía a este mundo." },
      { verse: 10, text: "En el mundo estaba, y el mundo por él fue hecho; pero el mundo no le conoció." }
    ],
    3: [
      { verse: 16, text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." },
      { verse: 17, text: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él." },
      { verse: 18, text: "El que en él cree, no es condenado; pero el que no cree, ya ha sido condenado, porque no ha creído en el nombre del unigénito Hijo de Dios." }
    ]
  }
};

export const ChapterReader = ({ book, chapter, onChapterChange }: ChapterReaderProps) => {
  const [verses, setVerses] = useState<{ verse: number; text: string }[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [fontSize, setFontSize] = useState([16]);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("RVR1960");
  const { toast } = useToast();

  useEffect(() => {
    const bookData = sampleVerses[book as keyof typeof sampleVerses];
    if (bookData && bookData[chapter as keyof typeof bookData]) {
      setVerses(bookData[chapter as keyof typeof bookData]);
    } else {
      const generateVerses = () => {
        const verseCount = Math.floor(Math.random() * 20) + 10;
        return Array.from({ length: verseCount }, (_, i) => ({
          verse: i + 1,
          text: `Este es el versículo ${i + 1} del capítulo ${chapter} de ${book}. Aquí encontrarás la Palabra de Dios que transformará tu vida y te dará sabiduría para enfrentar cada día con fe y esperanza.`
        }));
      };
      setVerses(generateVerses());
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

  const shareChapter = () => {
    const chapterText = verses.map(v => `${v.verse}. ${v.text}`).join('\n');
    if (navigator.share) {
      navigator.share({
        title: `${book} ${chapter}`,
        text: chapterText
      });
    } else {
      navigator.clipboard.writeText(`${book} ${chapter}\n\n${chapterText}`);
      toast({
        title: "Capítulo copiado",
        description: "El capítulo completo fue copiado al portapapeles"
      });
    }
  };

  const renderContent = () => {
    // Capítulo 0 es la introducción
    if (chapter === 0) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-6 w-6 text-biblical-orange" />
            <h2 className="text-xl font-bold">Introducción e Historia</h2>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-justify leading-relaxed" style={{ fontSize: `${fontSize[0]}px` }}>
              El libro de {book} es uno de los libros fundamentales de la Biblia. 
              Su historia, contexto y mensaje principal han impactado a millones de personas 
              a lo largo de los siglos. Este libro contiene enseñanzas profundas sobre la 
              naturaleza de Dios, la condición humana y el plan divino de redención.
            </p>
            <p className="text-justify leading-relaxed" style={{ fontSize: `${fontSize[0]}px` }}>
              En esta introducción exploraremos el trasfondo histórico, el propósito del libro, 
              sus temas principales y cómo se relaciona con el resto de las Escrituras. 
              Te invitamos a sumergirte en esta rica tradición de sabiduría divina.
            </p>
          </div>
        </div>
      );
    }

    // Capítulos normales
    return (
      <div className="space-y-4">
        {verses.map((verse) => {
          const verseKey = `${book}-${chapter}-${verse.verse}`;
          const isFavorite = favorites.has(verseKey);
          
          return (
            <div key={verse.verse} className="flex gap-3 group">
              <Badge variant="outline" className="shrink-0 mt-1 text-xs px-2 py-1">
                {verse.verse}
              </Badge>
              <div className="flex-1">
                <p 
                  className="leading-relaxed text-justify"
                  style={{ fontSize: `${fontSize[0]}px` }}
                >
                  {verse.text}
                </p>
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
    );
  };

  return (
    <div className="p-4">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              {chapter === 0 ? (
                <>
                  <AlertCircle className="h-6 w-6 text-biblical-orange" />
                  {book} - Introducción
                </>
              ) : (
                <>
                  <BookOpen className="h-6 w-6" />
                  {book} {chapter}
                </>
              )}
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onChapterChange(Math.max(0, chapter - 1))}
                disabled={chapter <= 0}
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
          
          {showSettings && (
            <div className="mt-4 p-4 bg-muted rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  <span className="text-sm font-medium">Tamaño de fuente: {fontSize[0]}px</span>
                </div>
                <div className="w-32">
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    min={12}
                    max={24}
                    step={1}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Versión:</span>
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RVR1960">RVR1960</SelectItem>
                    <SelectItem value="NVI">NVI</SelectItem>
                    <SelectItem value="RVA2015">RVA2015</SelectItem>
                    <SelectItem value="LBLA">LBLA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
            <Badge variant="outline">{selectedVersion}</Badge>
            {chapter > 0 && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={shareChapter}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Compartir capítulo
                </Button>
              </div>
            )}
          </div>
          
          {renderContent()}
          
          <div className="flex justify-between items-center mt-8 pt-4 border-t">
            <Button 
              variant="outline"
              onClick={() => onChapterChange(Math.max(0, chapter - 1))}
              disabled={chapter <= 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {chapter === 1 ? 'Introducción' : 'Capítulo anterior'}
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {chapter === 0 ? 'Introducción' : `Capítulo ${chapter}`}
            </span>
            
            <Button 
              variant="outline"
              onClick={() => onChapterChange(chapter + 1)}
              className="flex items-center gap-2"
            >
              {chapter === 0 ? 'Capítulo 1' : 'Siguiente capítulo'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
