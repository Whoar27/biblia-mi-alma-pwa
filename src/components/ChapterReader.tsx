import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, BookOpen, Settings, AlertCircle, Share2, Search, Type, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VerseOptionsPanel } from "./VerseOptionsPanel";

interface ChapterReaderProps {
  book: string;
  chapter: number;
  onChapterChange: (chapter: number) => void;
  onBackToBooks?: () => void;
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

export const ChapterReader = ({ book, chapter, onChapterChange, onBackToBooks }: ChapterReaderProps) => {
  const [verses, setVerses] = useState<{ verse: number; text: string }[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [fontSize, setFontSize] = useState([16]);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("RVR1960");
  const [selectedVerse, setSelectedVerse] = useState<{ verse: number; text: string } | null>(null);
  const [showNavigation, setShowNavigation] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("default");
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Mostrar navegación por 3 segundos al entrar
  useEffect(() => {
    setShowNavigation(true);
    const timer = setTimeout(() => {
      setShowNavigation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [chapter]);

  // Control de scroll para reducir tamaño de header
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        //setIsScrolled(scrollRef.current.scrollTop > 20); // No es necesario aquí, el header es fijo
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      toast({
        title: "Buscando...",
        description: `Buscando "${searchTerm}" en ${book} ${chapter}`
      });
    }
    setShowSearch(false);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    toast({
      title: "Tema cambiado",
      description: `Tema "${theme}" aplicado`
    });
    setShowThemes(false);
  };

  const handleShareChapter = () => {
    const chapterText = `${book} ${chapter} - Biblia ${selectedVersion}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${book} ${chapter}`,
        text: chapterText,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(chapterText);
        toast({
          title: "Copiado",
          description: "El enlace del capítulo fue copiado al portapapeles"
        });
      });
    } else {
      navigator.clipboard.writeText(chapterText);
      toast({
        title: "Copiado",
        description: "El enlace del capítulo fue copiado al portapapeles"
      });
    }
  };

  const handleVerseClick = (verse: { verse: number; text: string }) => {
    if (selectedVerse && selectedVerse.verse === verse.verse) {
      setSelectedVerse(null);
    } else {
      setSelectedVerse(verse);
    }
  };

  const handleHighlight = () => {
    toast({
      title: "Versículo resaltado",
      description: "El versículo ha sido resaltado"
    });
    setSelectedVerse(null);
  };

  const handleSave = () => {
    if (selectedVerse) {
      const verseKey = `${book}-${chapter}-${selectedVerse.verse}`;
      const newFavorites = new Set(favorites);
      newFavorites.add(verseKey);
      setFavorites(newFavorites);
      toast({
        title: "Versículo guardado",
        description: "El versículo fue agregado a favoritos"
      });
      setSelectedVerse(null);
    }
  };

  const handleAddNote = () => {
    toast({
      title: "Nota agregada",
      description: "Tu nota ha sido guardada"
    });
    setSelectedVerse(null);
  };

  const handleShare = () => {
    if (selectedVerse) {
      const verseText = `${book} ${chapter}:${selectedVerse.verse} - ${selectedVerse.text}`;
      
      if (navigator.share) {
        navigator.share({
          title: `${book} ${chapter}:${selectedVerse.verse}`,
          text: verseText
        }).catch(() => {
          navigator.clipboard.writeText(verseText);
          toast({
            title: "Copiado",
            description: "El versículo fue copiado al portapapeles"
          });
        });
      } else {
        navigator.clipboard.writeText(verseText);
        toast({
          title: "Copiado",
          description: "El versículo fue copiado al portapapeles"
        });
      }
      setSelectedVerse(null);
    }
  };

  const handleCreateImage = () => {
    toast({
      title: "Imagen creada",
      description: "La imagen con el versículo ha sido creada"
    });
    setSelectedVerse(null);
  };

  const renderContent = () => {
    // Capítulo 0 es la introducción
    if (chapter === 0) {
      return (
        <div className="space-y-6 p-4">
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
      <div className="space-y-4 p-4">
        {verses.map((verse) => {
          const verseKey = `${book}-${chapter}-${verse.verse}`;
          const isFavorite = favorites.has(verseKey);
          
          return (
            <div key={verse.verse} className="flex gap-3">
              <Badge variant="outline" className="shrink-0 mt-1 text-xs px-2 py-1 rounded-full">
                {verse.verse}
              </Badge>
              <div className="flex-1">
                <p 
                  className="leading-relaxed text-justify cursor-pointer hover:bg-muted/30 rounded p-1 transition-colors"
                  style={{ fontSize: `${fontSize[0]}px` }}
                  onClick={() => handleVerseClick(verse)}
                >
                  {verse.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header fijo que no se oculta */}
      <header className="bg-gradient-to-r from-biblical-purple to-biblical-blue text-white shadow-lg py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={onBackToBooks}
              className="text-white hover:bg-white/10 p-1"
            >
              {chapter === 0 ? (
                <AlertCircle className="h-5 w-5 text-biblical-orange" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </Button>
            <div className="text-lg">
              <span className="font-semibold">{book}</span>
              {chapter > 0 && <span className="ml-1">{chapter}</span>}
              {chapter === 0 && <span className="ml-1 text-sm opacity-80">Introducción</span>}
            </div>
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              {selectedVersion}
            </Badge>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="text-white hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:bg-white/10"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowThemes(!showThemes)}
              className="text-white hover:bg-white/10"
            >
              <Palette className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareChapter}
              className="text-white hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Panel de búsqueda */}
        {showSearch && (
          <div className="mt-2 mx-4 p-3 bg-white/10 rounded-lg">
            <div className="flex gap-2">
              <Input
                placeholder="Buscar en este capítulo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                Buscar
              </Button>
            </div>
          </div>
        )}

        {/* Panel de configuración de texto */}
        {showSettings && (
          <div className="mt-2 mx-4 p-3 bg-white/10 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-sm font-medium">Tamaño: {fontSize[0]}px</span>
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
                <SelectTrigger className="w-32 bg-white/10 border-white/20">
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

        {/* Panel de temas */}
        {showThemes && (
          <div className="mt-2 mx-4 p-3 bg-white/10 rounded-lg">
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleThemeChange("Claro")}
                className={`bg-white text-black hover:bg-gray-100 ${selectedTheme === "Claro" ? "ring-2 ring-white" : ""}`}
              >
                Claro
              </Button>
              <Button
                onClick={() => handleThemeChange("Oscuro")}
                className={`bg-gray-800 text-white hover:bg-gray-700 ${selectedTheme === "Oscuro" ? "ring-2 ring-white" : ""}`}
              >
                Oscuro
              </Button>
              <Button
                onClick={() => handleThemeChange("Sepia")}
                className={`bg-yellow-100 text-yellow-900 hover:bg-yellow-200 ${selectedTheme === "Sepia" ? "ring-2 ring-white" : ""}`}
              >
                Sepia
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Contenido con scroll */}
      <div ref={scrollRef} className="flex-1 overflow-auto">
        {renderContent()}
      </div>

      {/* Navegación simplificada - solo iconos */}
      {showNavigation && chapter !== 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-background/95 backdrop-blur-sm rounded-full p-2 shadow-lg border">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => onChapterChange(Math.max(0, chapter - 1))}
            disabled={chapter <= 0}
            className="rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => onChapterChange(chapter + 1)}
            className="rounded-full w-10 h-10 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Panel de opciones de versículo */}
      {selectedVerse && (
        <VerseOptionsPanel
          verse={selectedVerse}
          bookName={book}
          chapter={chapter}
          onHighlight={handleHighlight}
          onSave={handleSave}
          onAddNote={handleAddNote}
          onShare={handleShare}
          onCreateImage={handleCreateImage}
          onClose={() => setSelectedVerse(null)}
        />
      )}
    </div>
  );
};
