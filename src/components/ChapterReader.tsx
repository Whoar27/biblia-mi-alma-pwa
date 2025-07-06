import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, MoreHorizontal, ArrowLeft, Type, BookOpen, Palette, Share2, MoreVertical, TrendingUp, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VerseOptionsPanel } from "./VerseOptionsPanel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setBodyTheme, setBodyThemeFromGlobal } from '../lib/theme';
import { BibleVersionsPanel, BibleVersion } from "./BibleVersionsPanel";

interface ChapterReaderProps {
  book: string;
  chapter: number;
  onChapterChange: (chapter: number) => void;
  onBackToBooks?: () => void;
  selectedVersion?: string;
  onNavigateToTestament?: (testament: 'old' | 'new') => void;
  onBookChange?: (book: string, chapter: number) => void;
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

// Función para abreviar nombres de libros
const getBookAbbreviation = (bookName: string): string => {
  const abbreviations: { [key: string]: string } = {
    "Génesis": "Ge",
    "Éxodo": "Éx",
    "Levítico": "Lv",
    "Números": "Nm",
    "Deuteronomio": "Dt",
    "Josué": "Jos",
    "Jueces": "Jue",
    "Rut": "Rt",
    "1 Samuel": "1S",
    "2 Samuel": "2S",
    "1 Reyes": "1R",
    "2 Reyes": "2R",
    "1 Crónicas": "1Cr",
    "2 Crónicas": "2Cr",
    "Esdras": "Esd",
    "Nehemías": "Neh",
    "Ester": "Est",
    "Job": "Job",
    "Salmos": "Sal",
    "Proverbios": "Pr",
    "Eclesiastés": "Ec",
    "Cantares": "Cnt",
    "Isaías": "Is",
    "Jeremías": "Jer",
    "Lamentaciones": "Lm",
    "Ezequiel": "Ez",
    "Daniel": "Dn",
    "Oseas": "Os",
    "Joel": "Jl",
    "Amós": "Am",
    "Abdías": "Abd",
    "Jonás": "Jon",
    "Miqueas": "Miq",
    "Nahúm": "Nah",
    "Habacuc": "Hab",
    "Sofonías": "Sof",
    "Hageo": "Hag",
    "Zacarías": "Zac",
    "Malaquías": "Mal",
    "Mateo": "Mt",
    "Marcos": "Mc",
    "Lucas": "Lc",
    "Juan": "Jn",
    "Hechos": "Hch",
    "Romanos": "Ro",
    "1 Corintios": "1Co",
    "2 Corintios": "2Co",
    "Gálatas": "Gá",
    "Efesios": "Ef",
    "Filipenses": "Fil",
    "Colosenses": "Col",
    "1 Tesalonicenses": "1Ts",
    "2 Tesalonicenses": "2Ts",
    "1 Timoteo": "1Ti",
    "2 Timoteo": "2Ti",
    "Tito": "Tit",
    "Filemón": "Flm",
    "Hebreos": "Heb",
    "Santiago": "Stg",
    "1 Pedro": "1P",
    "2 Pedro": "2P",
    "1 Juan": "1Jn",
    "2 Juan": "2Jn",
    "3 Juan": "3Jn",
    "Judas": "Jud",
    "Apocalipsis": "Ap"
  };
  
  return abbreviations[bookName] || bookName;
};

// Función para determinar a qué testamento pertenece un libro
const getTestamentForBook = (bookName: string): 'old' | 'new' => {
  const oldTestamentBooks = [
    "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio",
    "Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel",
    "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas",
    "Esdras", "Nehemías", "Ester", "Job", "Salmos",
    "Proverbios", "Eclesiastés", "Cantares", "Isaías",
    "Jeremías", "Lamentaciones", "Ezequiel", "Daniel",
    "Oseas", "Joel", "Amós", "Abdías", "Jonás",
    "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo",
    "Zacarías", "Malaquías"
  ];
  
  return oldTestamentBooks.includes(bookName) ? 'old' : 'new';
};

// Función para obtener el siguiente libro
const getNextBook = (currentBook: string): string | null => {
  const allBooks = [
    "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio",
    "Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel",
    "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas",
    "Esdras", "Nehemías", "Ester", "Job", "Salmos",
    "Proverbios", "Eclesiastés", "Cantares", "Isaías",
    "Jeremías", "Lamentaciones", "Ezequiel", "Daniel",
    "Oseas", "Joel", "Amós", "Abdías", "Jonás",
    "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo",
    "Zacarías", "Malaquías", "Mateo", "Marcos", "Lucas",
    "Juan", "Hechos", "Romanos", "1 Corintios", "2 Corintios",
    "Gálatas", "Efesios", "Filipenses", "Colosenses",
    "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo",
    "2 Timoteo", "Tito", "Filemón", "Hebreos", "Santiago",
    "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan",
    "Judas", "Apocalipsis"
  ];
  
  const currentIndex = allBooks.indexOf(currentBook);
  if (currentIndex === -1 || currentIndex === allBooks.length - 1) {
    return null; // No hay siguiente libro
  }
  
  return allBooks[currentIndex + 1];
};

// Función para obtener el libro anterior
const getPreviousBook = (currentBook: string): string | null => {
  const allBooks = [
    "Génesis", "Éxodo", "Levítico", "Números", "Deuteronomio",
    "Josué", "Jueces", "Rut", "1 Samuel", "2 Samuel",
    "1 Reyes", "2 Reyes", "1 Crónicas", "2 Crónicas",
    "Esdras", "Nehemías", "Ester", "Job", "Salmos",
    "Proverbios", "Eclesiastés", "Cantares", "Isaías",
    "Jeremías", "Lamentaciones", "Ezequiel", "Daniel",
    "Oseas", "Joel", "Amós", "Abdías", "Jonás",
    "Miqueas", "Nahúm", "Habacuc", "Sofonías", "Hageo",
    "Zacarías", "Malaquías", "Mateo", "Marcos", "Lucas",
    "Juan", "Hechos", "Romanos", "1 Corintios", "2 Corintios",
    "Gálatas", "Efesios", "Filipenses", "Colosenses",
    "1 Tesalonicenses", "2 Tesalonicenses", "1 Timoteo",
    "2 Timoteo", "Tito", "Filemón", "Hebreos", "Santiago",
    "1 Pedro", "2 Pedro", "1 Juan", "2 Juan", "3 Juan",
    "Judas", "Apocalipsis"
  ];
  
  const currentIndex = allBooks.indexOf(currentBook);
  if (currentIndex <= 0) {
    return null; // No hay libro anterior
  }
  
  return allBooks[currentIndex - 1];
};

// Objeto con el número real de capítulos de cada libro
const bookChapters: { [key: string]: number } = {
  "Génesis": 50, "Éxodo": 40, "Levítico": 27, "Números": 36, "Deuteronomio": 34,
  "Josué": 24, "Jueces": 21, "Rut": 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Reyes": 22, "2 Reyes": 25, "1 Crónicas": 29, "2 Crónicas": 36,
  "Esdras": 10, "Nehemías": 13, "Ester": 10, "Job": 42, "Salmos": 150,
  "Proverbios": 31, "Eclesiastés": 12, "Cantares": 8, "Isaías": 66,
  "Jeremías": 52, "Lamentaciones": 5, "Ezequiel": 48, "Daniel": 12,
  "Oseas": 14, "Joel": 3, "Amós": 9, "Abdías": 1, "Jonás": 4,
  "Miqueas": 7, "Nahúm": 3, "Habacuc": 3, "Sofonías": 3, "Hageo": 2,
  "Zacarías": 14, "Malaquías": 4, "Mateo": 28, "Marcos": 16, "Lucas": 24,
  "Juan": 21, "Hechos": 28, "Romanos": 16, "1 Corintios": 16, "2 Corintios": 13,
  "Gálatas": 6, "Efesios": 6, "Filipenses": 4, "Colosenses": 4,
  "1 Tesalonicenses": 5, "2 Tesalonicenses": 3, "1 Timoteo": 6,
  "2 Timoteo": 4, "Tito": 3, "Filemón": 1, "Hebreos": 13, "Santiago": 5,
  "1 Pedro": 5, "2 Pedro": 3, "1 Juan": 5, "2 Juan": 1, "3 Juan": 1,
  "Judas": 1, "Apocalipsis": 22
};

// Función para obtener el número de capítulos de un libro
const getBookChapterCount = (bookName: string): number => {
  const chapterCounts: { [key: string]: number } = {
    "Génesis": 50, "Éxodo": 40, "Levítico": 27, "Números": 36, "Deuteronomio": 34,
    "Josué": 24, "Jueces": 21, "Rut": 4, "1 Samuel": 31, "2 Samuel": 24,
    "1 Reyes": 22, "2 Reyes": 25, "1 Crónicas": 29, "2 Crónicas": 36,
    "Esdras": 10, "Nehemías": 13, "Ester": 10, "Job": 42, "Salmos": 150,
    "Proverbios": 31, "Eclesiastés": 12, "Cantares": 8, "Isaías": 66,
    "Jeremías": 52, "Lamentaciones": 5, "Ezequiel": 48, "Daniel": 12,
    "Oseas": 14, "Joel": 3, "Amós": 9, "Abdías": 1, "Jonás": 4,
    "Miqueas": 7, "Nahúm": 3, "Habacuc": 3, "Sofonías": 3, "Hageo": 2,
    "Zacarías": 14, "Malaquías": 4, "Mateo": 28, "Marcos": 16, "Lucas": 24,
    "Juan": 21, "Hechos": 28, "Romanos": 16, "1 Corintios": 16, "2 Corintios": 13,
    "Gálatas": 6, "Efesios": 6, "Filipenses": 4, "Colosenses": 4,
    "1 Tesalonicenses": 5, "2 Tesalonicenses": 3, "1 Timoteo": 6, "2 Timoteo": 4,
    "Tito": 3, "Filemón": 1, "Hebreos": 13, "Santiago": 5, "1 Pedro": 5,
    "2 Pedro": 3, "1 Juan": 5, "2 Juan": 1, "3 Juan": 1, "Judas": 1, "Apocalipsis": 22
  };
  
  return chapterCounts[bookName] || 50;
};

// Función para obtener los estilos de un tema
const getThemeStyles = (theme: string) => {
  const themes = {
    light: {
      background: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-50',
      buttonBg: 'bg-white',
      buttonText: 'text-gray-900',
      buttonBorder: 'border-gray-300',
      selectedBg: 'bg-gray-100',
      selectedBorder: 'border border-gray-300',
      selectedText: 'text-gray-900',
      selectedBadgeBg: 'bg-gray-700',
      selectedBadgeText: 'text-white',
      selectedBadgeBorder: 'border-gray-700'
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-gray-100',
      border: 'border-gray-700',
      hover: 'hover:bg-gray-800',
      buttonBg: 'bg-gray-800',
      buttonText: 'text-gray-100',
      buttonBorder: 'border-gray-600',
      selectedBg: 'bg-gray-700',
      selectedBorder: 'border border-gray-500',
      selectedText: 'text-gray-100',
      selectedBadgeBg: 'bg-gray-500',
      selectedBadgeText: 'text-white',
      selectedBadgeBorder: 'border-gray-500'
    }
  };
  return themes[theme as keyof typeof themes] || themes['light'];
};

// Contexto para compartir el tema
export const ThemeContext = createContext<{
  currentTheme: string;
  getThemeStyles: (theme: string) => any;
}>({
  currentTheme: 'light',
  getThemeStyles: () => ({})
});

export const useTheme = () => useContext(ThemeContext);

const trendingSearches = [
  "sofonias 3:17",
  "salmo 91",
  "sofonías 3:17"
];

export const ChapterReader = ({ book, chapter, onChapterChange, onBackToBooks, selectedVersion, onNavigateToTestament, onBookChange }: ChapterReaderProps) => {
  // Cargar preferencias guardadas del localStorage
  const getStoredFontSize = () => {
    const stored = localStorage.getItem('biblia-font-size');
    return stored ? [parseInt(stored)] : [16];
  };

  const getStoredTheme = () => {
    return localStorage.getItem('theme-lectura') || localStorage.getItem('theme-global') || 'light';
  };

  const [verses, setVerses] = useState<{ verse: number; text: string }[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [fontSize, setFontSize] = useState(getStoredFontSize);
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());
  const [highlightedVerses, setHighlightedVerses] = useState<Map<number, string>>(new Map());
  const [showNavigation, setShowNavigation] = useState(true);
  const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
  const [showBibleVersionsPanel, setShowBibleVersionsPanel] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ verse: number; text: string }[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(["sofonias 3:17", "entonces dijo a sus dicipulos", "digno eres tú"]);
  const [searchRecommendations] = useState<string[]>([
    "salvación", "perdón", "gracia", "misericordia", "sabiduría", 
    "verdad", "vida", "luz", "camino", "justicia"
  ]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [currentTheme, setCurrentTheme] = useState(getStoredTheme);

  const themeBgHex = {
    light: '#fff8e1',
    dark: '#18181b',
  };

  // Ejemplo de versiones
  const bibleVersions: BibleVersion[] = [
    {
      id: "1",
      code: "RVC",
      name: "Reina Valera Contemporánea",
      publisher: "United Bible Societies",
      year: "2011",
      coverUrl: undefined,
      downloaded: true,
      selected: false
    },
    {
      id: "2",
      code: "TLA",
      name: "Traducción en Lenguaje Actual",
      publisher: "United Bible Societies",
      year: "2000",
      coverUrl: undefined,
      downloaded: true,
      selected: false
    },
    {
      id: "3",
      code: "RVR1960",
      name: "Biblia Reina Valera 1960",
      publisher: "United Bible Societies",
      year: "1960",
      coverUrl: undefined,
      downloaded: true,
      selected: false
    },
    {
      id: "4",
      code: "TLAI",
      name: "Traducción en Lenguaje Actual Internacional",
      publisher: "United Bible Societies",
      year: "2015",
      coverUrl: undefined,
      downloaded: false,
      selected: false
    },
    {
      id: "5",
      code: "BDO1573",
      name: "Biblia del Oso 1573",
      publisher: "United Bible Societies",
      year: "1573",
      coverUrl: undefined,
      downloaded: false,
      selected: false
    }
  ];

  // Obtener el código de la versión seleccionada desde localStorage o default
  const getStoredVersion = () => {
    return localStorage.getItem('biblia-version') || 'RVR1960';
  };

  const [selectedVersionCode, setSelectedVersionCode] = useState(getStoredVersion());

  // Aplicar versión guardada al inicializar
  useEffect(() => {
    const storedVersion = getStoredVersion();
    if (storedVersion && storedVersion !== selectedVersion) {
      // Aquí podrías emitir un callback para cambiar la versión globalmente
      // Por ahora solo mostramos la notificación
      showSubtleToast(`Versión cargada: ${storedVersion}`);
    }
  }, []);

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

  useEffect(() => {
    // Al entrar a la lectura
    const lecturaTheme = localStorage.getItem('theme-lectura');
    if (lecturaTheme) {
      setBodyTheme(lecturaTheme);
    } else {
      setBodyThemeFromGlobal();
    }
    return () => {
      // Al salir de la lectura
      setBodyThemeFromGlobal();
    };
  }, []);

  const handleVerseClick = (verse: { verse: number; text: string }) => {
    const newSelectedVerses = new Set(selectedVerses);
    if (newSelectedVerses.has(verse.verse)) {
      newSelectedVerses.delete(verse.verse);
    } else {
      newSelectedVerses.add(verse.verse);
    }
    setSelectedVerses(newSelectedVerses);
  };

  const handleHighlight = (color: string) => {
    const newHighlightedVerses = new Map(highlightedVerses);
    
    selectedVerses.forEach(verseNumber => {
      const currentColor = newHighlightedVerses.get(verseNumber);
      if (currentColor === color) {
        // Si ya tiene el mismo color, lo desresaltamos
        newHighlightedVerses.delete(verseNumber);
      } else {
        // Si tiene otro color o no tiene color, aplicamos el nuevo
        newHighlightedVerses.set(verseNumber, color);
      }
    });
    
    setHighlightedVerses(newHighlightedVerses);
    setSelectedVerses(new Set());
  };

  const handleSave = () => {
    if (selectedVerses.size > 0) {
      const newFavorites = new Set(favorites);
      selectedVerses.forEach(verseNumber => {
        const verseKey = `${book}-${chapter}-${verseNumber}`;
        newFavorites.add(verseKey);
      });
      setFavorites(newFavorites);
      const count = selectedVerses.size;
      toast({
        title: count === 1 ? "Versículo guardado" : `${count} versículos guardados`,
        description: count === 1 ? "El versículo fue agregado a favoritos" : "Los versículos fueron agregados a favoritos"
      });
      setSelectedVerses(new Set());
    }
  };

  const handleAddNote = () => {
    const count = selectedVerses.size;
    toast({
      title: count === 1 ? "Nota agregada" : `${count} notas agregadas`,
      description: count === 1 ? "Tu nota ha sido guardada" : "Tus notas han sido guardadas"
    });
    setSelectedVerses(new Set());
  };

  const handleShareChapter = () => {
    const chapterTitle = chapter === 0 ? `${book} - Introducción` : `${book} ${chapter}`;
    const version = selectedVersion || 'RVR1960';
    
    // Crear el contenido completo del capítulo
    let chapterContent = '';
    
    if (chapter === 0) {
      // Para introducciones
      chapterContent = `El libro de ${book} es uno de los libros fundamentales de la Biblia. Su historia, contexto y mensaje principal han impactado a millones de personas a lo largo de los siglos. Este libro contiene enseñanzas profundas sobre la naturaleza de Dios, la condición humana y el plan divino de redención.

En esta introducción exploraremos el trasfondo histórico, el propósito del libro, 
sus temas principales y cómo se relaciona con el resto de las Escrituras. Te invitamos a sumergirte en esta rica tradición de sabiduría divina.`;
    } else {
      // Para capítulos normales, incluir todos los versículos
      chapterContent = verses.map(verse => `${verse.verse}. ${verse.text}`).join('\n\n');
    }
    
    // Mensaje predeterminado con información del capítulo
    const shareMessage = `📖 ${chapterTitle} (${version})

${chapterContent}

Compartido desde Biblia Mi Alma PWA`;

    if (navigator.share) {
      navigator.share({
        title: `${chapterTitle} - Biblia Mi Alma`,
        text: shareMessage,
        url: window.location.href
      });
    } else {
      // Fallback: abrir enlaces directos a aplicaciones populares
      showShareOptions(shareMessage, chapterTitle);
    }
  };

  const showShareOptions = (text: string, title: string) => {
    const encodedText = encodeURIComponent(text);
    const encodedTitle = encodeURIComponent(title);
    
    const shareOptions = [
      {
        name: 'WhatsApp',
        url: `https://wa.me/?text=${encodedText}`,
        icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>`
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`,
        icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
      },
      {
        name: 'Twitter',
        url: `https://twitter.com/intent/tweet?text=${encodedText}`,
        icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`
      },
      {
        name: 'Telegram',
        url: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedText}`,
        icon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.347.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`
      }
    ];

    // Crear modal de opciones
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 class="text-lg font-semibold mb-4">Compartir ${title}</h3>
        <div class="space-y-3">
          ${shareOptions.map(option => `
            <button class="w-full p-3 text-left border rounded-lg hover:bg-gray-50 flex items-center gap-3 transition-colors" 
                    onclick="window.open('${option.url}', '_blank'); this.closest('.fixed').remove();">
              <div class="text-green-600">${option.icon}</div>
              <span class="font-medium">${option.name}</span>
            </button>
          `).join('')}
        </div>
        <button class="w-full mt-4 p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors" 
                onclick="this.closest('.fixed').remove();">
          Cancelar
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize([newSize]);
    localStorage.setItem('biblia-font-size', newSize.toString());
    showSubtleToast(`Tamaño: ${newSize}px`);
  };

  const handleVersionChange = (newCode: string) => {
    setSelectedVersionCode(newCode);
    localStorage.setItem('biblia-version', newCode);
    showSubtleToast(`Versión: ${newCode}`);
    window.dispatchEvent(new CustomEvent('bibleVersionChanged', { detail: newCode }));
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme-global', theme);
    localStorage.removeItem('theme-lectura');
    setBodyTheme(theme);
    showSubtleToast(`Tema: ${theme}`);
  };

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;

    // Simular búsqueda local en el capítulo
    const mockResults = [
      { verse: 17, text: 'Pues tu Dios está contigo y con su poder te salvará. Aunque no necesita de palabras para demostrarte que te ama,' },
      { verse: 1, text: '¡Qué mal te va a ir, Jerusalén! Eres una ciudad desobediente, y maltratas a los demás. ¡Estás llena de pecado!' },
      { verse: 10, text: 'Entonces la gente que me adora, y que ahora anda en otros países, vendrá a presentarme ofrendas desde el país de' },
      { verse: 11, text: 'Tú, Jerusalén, has sido muy rebelde; pero no volverás a quedar en vergüenza. Viene el día en que expulsaré de ti a los que se' },
      { verse: 12, text: 'En tus calles solo habrá gente humilde y sencilla, que pondrá en mí su confianza.' }
    ];
    setSearchResults(mockResults.filter(r => r.text.toLowerCase().includes(searchTerm.toLowerCase()) || String(r.verse).includes(searchTerm)));
  };

  const renderContent = () => {
    // Capítulo 0 es la introducción
    if (chapter === 0) {
      return (
        <div className="space-y-6 p-4">
          <div className="prose prose-sm max-w-none">
            <p className={`text-justify leading-relaxed ${getThemeStyles(currentTheme).text}`} style={{ fontSize: `${fontSize[0]}px` }}>
              El libro de {book} es uno de los libros fundamentales de la Biblia. 
              Su historia, contexto y mensaje principal han impactado a millones de personas 
              a lo largo de los siglos. Este libro contiene enseñanzas profundas sobre la 
              naturaleza de Dios, la condición humana y el plan divino de redención.
            </p>
            <p className={`text-justify leading-relaxed ${getThemeStyles(currentTheme).text}`} style={{ fontSize: `${fontSize[0]}px` }}>
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
          const isSelected = selectedVerses.has(verse.verse);
          const highlightColor = highlightedVerses.get(verse.verse);
          
          // Clases de resaltado según el color
          const getHighlightClass = (color: string) => {
            switch (color) {
              case 'yellow': return 'bg-yellow-200 dark:bg-yellow-400/30';
              case 'green': return 'bg-green-300 dark:bg-green-600/30';
              case 'blue': return 'bg-blue-300 dark:bg-blue-600/30';
              case 'pink': return 'bg-pink-300 dark:bg-pink-600/30';
              case 'orange': return 'bg-orange-300 dark:bg-orange-500/30';
              default: return '';
            }
          };
          
          return (
            <div
              key={verse.verse}
              className={`flex gap-3 p-3 rounded-lg transition-all duration-200 ${
                isSelected ? getThemeStyles(currentTheme).selectedBg : 
                highlightColor ? getHighlightClass(highlightColor) : getThemeStyles(currentTheme).background
              }`}
            >
              <Badge
                variant="outline"
                className={`shrink-0 mt-1 text-xs px-2 py-1 rounded-full ${
                  isSelected
                    ? getThemeStyles(currentTheme).selectedBadgeBg + ' ' + getThemeStyles(currentTheme).selectedBadgeText + ' ' + getThemeStyles(currentTheme).buttonBorder
                    : getThemeStyles(currentTheme).buttonBorder + ' ' + getThemeStyles(currentTheme).text
                }`}
              >
                {verse.verse}
              </Badge>
              <div className="flex-1">
                <p
                  className={`leading-relaxed cursor-pointer transition-colors ${
                    isSelected
                      ? getThemeStyles(currentTheme).selectedText
                      : getThemeStyles(currentTheme).text + ' lg:hover:' + getThemeStyles(currentTheme).hover.replace('hover:', '')
                  }`}
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

  const showSubtleToast = (message: string) => {
    // Remover notificaciones existentes antes de crear una nueva
    const existingToasts = document.querySelectorAll('.chapter-toast');
    existingToasts.forEach(toast => {
      toast.remove();
    });

    // Crear notificación sutil en la parte inferior
    const toast = document.createElement('div');
    toast.className = 'chapter-toast fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm z-50 transition-opacity duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 2000);
  };

  // Función para manejar el cambio de capítulo con animación
  const handleChapterChangeWithAnimation = (newChapter: number, direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection(direction);
    
    setTimeout(() => {
      const maxChapters = getBookChapterCount(book);
      
      // Verificar si necesitamos cambiar de libro
      if (direction === 'left' && newChapter > maxChapters) {
        // Intentar ir al siguiente libro
        const nextBook = getNextBook(book);
        if (nextBook && onBookChange) {
          onBookChange(nextBook, 0); // Ir a la introducción del siguiente libro
          setTimeout(() => showSubtleToast(`${nextBook} - Introducción`), 100);
        }
      } else if (direction === 'right' && newChapter < 0) {
        // Intentar ir al libro anterior
        const previousBook = getPreviousBook(book);
        if (previousBook && onBookChange) {
          const previousBookChapters = getBookChapterCount(previousBook);
          onBookChange(previousBook, previousBookChapters); // Ir al último capítulo del libro anterior
          setTimeout(() => showSubtleToast(`${previousBook} ${previousBookChapters}`), 100);
        }
      } else if (newChapter >= 0 && newChapter <= maxChapters) {
        // Cambio normal de capítulo
        onChapterChange(newChapter);
        if (newChapter === 0) {
          setTimeout(() => showSubtleToast(`${book} - Introducción`), 100);
        } else {
          setTimeout(() => showSubtleToast(`${book} ${newChapter}`), 100);
        }
      }
      
      setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection(null);
      }, 100);
    }, 150);
  };

  // Gestos de deslizar
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      // Solo activar si el movimiento horizontal es mayor que el vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        isSwiping = true;
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isSwiping || !startX) return;

      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const minSwipeDistance = 100;

      if (Math.abs(diffX) > minSwipeDistance) {
        const maxChapters = getBookChapterCount(book);
        
        if (diffX > 0) {
          // Deslizar hacia la izquierda = siguiente capítulo
          if (chapter === 0) {
            // Desde introducción, ir al primer capítulo del mismo libro
            handleChapterChangeWithAnimation(1, 'left');
          } else if (chapter < maxChapters) {
            handleChapterChangeWithAnimation(chapter + 1, 'left');
          } else {
            // Intentar ir al siguiente libro
            const nextBook = getNextBook(book);
            if (nextBook && onBookChange) {
              onBookChange(nextBook, 0);
              setTimeout(() => showSubtleToast(`${nextBook} - Introducción`), 100);
            }
          }
        } else {
          // Deslizar hacia la derecha = capítulo anterior
          if (chapter === 0) {
            // Desde introducción, ir al último capítulo del libro anterior
            const previousBook = getPreviousBook(book);
            if (previousBook && onBookChange) {
              const previousBookChapters = getBookChapterCount(previousBook);
              onBookChange(previousBook, previousBookChapters);
              setTimeout(() => showSubtleToast(`${previousBook} ${previousBookChapters}`), 100);
            }
          } else if (chapter > 1) {
            handleChapterChangeWithAnimation(chapter - 1, 'right');
          } else {
            // Desde capítulo 1, ir a la introducción del mismo libro
            handleChapterChangeWithAnimation(0, 'right');
          }
        }
      }

      startX = 0;
      startY = 0;
      isSwiping = false;
    };

    const container = document.getElementById('chapter-content');
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [chapter, book, onChapterChange, onBookChange, showSubtleToast]);

  const handlePreviousChapter = () => {
    if (chapter === 0) {
      // Desde introducción, ir al último capítulo del libro anterior
      const previousBook = getPreviousBook(book);
      if (previousBook && onBookChange) {
        const previousBookChapters = getBookChapterCount(previousBook);
        onBookChange(previousBook, previousBookChapters);
        setTimeout(() => showSubtleToast(`${previousBook} ${previousBookChapters}`), 100);
      }
    } else if (chapter > 1) {
      handleChapterChangeWithAnimation(chapter - 1, 'right');
    } else {
      // Desde capítulo 1, ir a la introducción del mismo libro
      handleChapterChangeWithAnimation(0, 'right');
    }
  };

  const handleNextChapter = () => {
    const maxChapters = getBookChapterCount(book);
    
    if (chapter === 0) {
      // Desde introducción, ir al primer capítulo del mismo libro
      handleChapterChangeWithAnimation(1, 'left');
    } else if (chapter < maxChapters) {
      handleChapterChangeWithAnimation(chapter + 1, 'left');
    } else {
      // Intentar ir al siguiente libro
      const nextBook = getNextBook(book);
      if (nextBook && onBookChange) {
        onBookChange(nextBook, 0);
        setTimeout(() => showSubtleToast(`${nextBook} - Introducción`), 100);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, getThemeStyles }}>
      <div 
        className={`min-h-screen ${getThemeStyles(currentTheme).background} ${getThemeStyles(currentTheme).text}`}
      >
        {/* Header fijo específico para ChapterReader */}
        <header className={`fixed top-0 left-0 right-0 z-50 ${getThemeStyles(currentTheme).background} border-b ${getThemeStyles(currentTheme).border} py-3`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Lado izquierdo - Libro y versión */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const testament = getTestamentForBook(book);
                    onNavigateToTestament?.(testament);
                  }}
                  className={`rounded-l-full rounded-r-none h-8 px-3 hover:${getThemeStyles(currentTheme).hover} ${getThemeStyles(currentTheme).buttonBg} ${getThemeStyles(currentTheme).text} ${getThemeStyles(currentTheme).buttonBorder}`}
                >
                  {book} {chapter}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBibleVersionsPanel(true)}
                  className={`rounded-l-none rounded-r-full h-8 px-3 hover:${getThemeStyles(currentTheme).hover} ${getThemeStyles(currentTheme).buttonBg} ${getThemeStyles(currentTheme).text} ${getThemeStyles(currentTheme).buttonBorder} tracking-widest font-bold`}
                >
                  {selectedVersionCode.toUpperCase()}
                </Button>
              </div>
              
              {/* Lado derecho - Búsqueda y opciones */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(true)}
                  className="p-1"
                >
                  <Search className="h-5 w-5" />
                </Button>
                
                {/* Menú de opciones */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setShowFontSizeMenu(true)}>
                      <Type className="mr-2 h-4 w-4" />
                      Tamaño de fuente
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowThemeMenu(true)}>
                      <Palette className="mr-2 h-4 w-4" />
                      Temas
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleShareChapter}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal con scroll */}
        <div 
          ref={scrollRef}
          id="chapter-content"
          className={`flex-1 overflow-y-auto pt-16 pb-32 px-4 transition-transform duration-300 ease-in-out ${
            isAnimating 
              ? slideDirection === 'left' 
                ? 'translate-x-full opacity-0' 
                : slideDirection === 'right' 
                  ? '-translate-x-full opacity-0' 
                  : ''
              : 'translate-x-0 opacity-100'
          }`}
          style={{ fontSize: `${fontSize[0]}px` }}
        >
          {/* Resultados de búsqueda */}
          {searchResults.length > 0 && (
            <div className={`p-4 ${getThemeStyles(currentTheme).background} border-b ${getThemeStyles(currentTheme).border}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${getThemeStyles(currentTheme).text}`}>
                  Resultados de búsqueda ({searchResults.length})
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchResults([]);
                    setSearchQuery("");
                  }}
                  className={`${getThemeStyles(currentTheme).text} hover:${getThemeStyles(currentTheme).hover}`}
                >
                  Limpiar
                </Button>
              </div>
              <div className="space-y-2">
                {searchResults.map((verse) => (
                  <div key={verse.verse} className={`p-2 ${getThemeStyles(currentTheme).background} rounded border ${getThemeStyles(currentTheme).border}`}>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={`shrink-0 text-xs ${getThemeStyles(currentTheme).buttonBorder} ${getThemeStyles(currentTheme).text}`}>
                        {verse.verse}
                      </Badge>
                      <p className={`text-sm ${getThemeStyles(currentTheme).text}`}>{verse.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {renderContent()}
        </div>

        {/* Panel de opciones de versículos */}
        {selectedVerses.size > 0 && (
          <VerseOptionsPanel
            verse={{ verse: Array.from(selectedVerses)[0], text: `${selectedVerses.size} versículo${selectedVerses.size > 1 ? 's' : ''} seleccionado${selectedVerses.size > 1 ? 's' : ''}` }}
            bookName={book}
            chapter={chapter}
            onHighlight={handleHighlight}
            onSave={handleSave}
            onAddNote={handleAddNote}
            onShare={handleShareChapter}
            onCreateImage={() => {}}
            onClose={() => setSelectedVerses(new Set())}
          />
        )}

        {/* Diálogo de tamaño de fuente */}
        <Dialog open={showFontSizeMenu} onOpenChange={setShowFontSizeMenu}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tamaño de fuente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tamaño actual: {fontSize[0]}px</label>
                <Slider
                  value={fontSize}
                  onValueChange={(value) => setFontSize(value)}
                  max={24}
                  min={12}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowFontSizeMenu(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  handleFontSizeChange(fontSize[0]);
                  setShowFontSizeMenu(false);
                }}>
                  Aplicar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Panel de versiones tipo bottom sheet */}
        <BibleVersionsPanel
          open={showBibleVersionsPanel}
          onClose={() => setShowBibleVersionsPanel(false)}
          versions={bibleVersions.map(v => ({ ...v, selected: v.code === selectedVersionCode }))}
          onSelect={(code) => {
            setShowBibleVersionsPanel(false);
            handleVersionChange(code);
          }}
          onAdd={() => {}}
          onSettings={() => {}}
        />

        {/* Diálogo de temas */}
        <Dialog open={showThemeMenu} onOpenChange={setShowThemeMenu}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Temas</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                {['light', 'dark'].map((theme) => {
                  const themeStyles = getThemeStyles(theme);
                  const isSelected = currentTheme === theme;
                  
                  return (
                    <Button
                      key={theme}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => {
                        handleThemeChange(theme);
                        setShowThemeMenu(false);
                      }}
                      className={`justify-start transition-all duration-200 ${
                        isSelected 
                          ? `${themeStyles.buttonBg} ${themeStyles.buttonText} ${themeStyles.buttonBorder}`
                          : `${themeStyles.buttonBg} ${themeStyles.buttonText} ${themeStyles.buttonBorder} hover:${themeStyles.hover}`
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div 
                          className="w-4 h-4 rounded-full border-2"
                          style={{
                            backgroundColor: 
                              theme === 'light' ? '#ffffff' :
                              theme === 'dark' ? '#1f2937' :
                              '#000000',
                            borderColor:
                              theme === 'light' ? '#d1d5db' :
                              theme === 'dark' ? '#4b5563' :
                              '#ffffff'
                          }}
                        />
                        <span className="flex-1 text-left">{theme}</span>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Pantalla de búsqueda completa */}
        {showSearch && (
          <div className={`fixed inset-0 ${getThemeStyles(currentTheme).background} z-50 flex flex-col`}>
            {/* Header de búsqueda */}
            <div className="flex items-center gap-2 p-4 border-b border-border sticky top-0 bg-background z-10">
              <div className="flex-1 flex items-center gap-2 bg-[#f3f3f3] rounded-full px-3 py-2">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="flex-1 bg-transparent outline-none border-none text-base"
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="ml-2 text-muted-foreground font-semibold"
              >
                Cancelar
              </Button>
            </div>

            {/* Contenido de búsqueda */}
            <div className="flex-1 overflow-y-auto p-4">
              {searchQuery === "" ? (
                <div className="space-y-8">
                  {/* Tendencias */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-biblical-orange" />
                      <h3 className="text-lg font-semibold">Tendencia en Búsquedas</h3>
                    </div>
                    <div className="space-y-2">
                      {trendingSearches.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => {
                            setSearchQuery(item);
                            handleSearch(item);
                          }}
                        >
                          <TrendingUp className="h-5 w-5 text-biblical-orange flex-shrink-0" />
                          <span className="flex-1 text-left">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Búsquedas recientes */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-semibold flex-1">Búsquedas Recientes</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full px-4 py-1 text-xs"
                          onClick={() => setRecentSearches([])}
                        >
                          Borrar
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {recentSearches.map((term, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                            onClick={() => {
                              setSearchQuery(term);
                              handleSearch(term);
                            }}
                          >
                            <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            <span className="flex-1 text-left">{term}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Resultados de búsqueda */
                <div className="space-y-4">
                  {/* Slider de filtros */}
                  <div className="w-full overflow-x-auto pb-2">
                    <div className="flex gap-2 min-w-max">
                      {['Todos', 'Biblia', 'Páginas', 'Videos', 'Planes'].map((filtro, idx) => (
                        <Button
                          key={filtro}
                          variant={idx === 0 ? 'default' : 'outline'}
                          size="sm"
                          className="rounded-full px-5"
                          style={{ minWidth: 90 }}
                        >
                          {filtro}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold ${getThemeStyles(currentTheme).text}`}>Biblia</h3>
                  {searchResults.length > 0 ? (
                    <div className="space-y-3">
                      {searchResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 border-l-4 border-black/80 rounded-lg bg-white mb-4`}
                          onClick={() => {
                            // Navegar al versículo
                            setShowSearch(false);
                          }}
                        >
                          <div className="font-bold text-xs mb-1 text-gray-700 uppercase">SOFONÍAS {result.verse}</div>
                          <div className="text-base text-black leading-snug">{result.text}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`text-center py-8 text-muted-foreground ${getThemeStyles(currentTheme).text}`}>
                      No se encontraron resultados para "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botones flotantes de navegación */}
        <div className="fixed bottom-24 left-4 right-4 z-40 flex justify-between pointer-events-none">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousChapter}
            disabled={chapter === 0 && !getPreviousBook(book)}
            className={`pointer-events-auto shadow-lg rounded-full w-12 h-12 p-0 ${getThemeStyles(currentTheme).buttonBg} ${getThemeStyles(currentTheme).buttonText} ${getThemeStyles(currentTheme).buttonBorder} ${getThemeStyles(currentTheme).hover}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextChapter}
            disabled={chapter >= getBookChapterCount(book) && !getNextBook(book)}
            className={`pointer-events-auto shadow-lg rounded-full w-12 h-12 p-0 ${getThemeStyles(currentTheme).buttonBg} ${getThemeStyles(currentTheme).buttonText} ${getThemeStyles(currentTheme).buttonBorder} ${getThemeStyles(currentTheme).hover}`}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
