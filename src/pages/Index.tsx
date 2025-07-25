import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Book, Calendar, Search, Settings, AlertCircle, Bell, Flame } from "lucide-react";
import { BooksList } from "@/components/BooksList";
import { ChapterReader, useTheme } from "@/components/ChapterReader";
import { FavoriteVerses } from "@/components/FavoriteVerses";
import { VerseExplanation } from "@/components/VerseExplanation";
import { BibleVersionSelector } from "@/components/BibleVersionSelector";
import { EnhancedBooksList } from "@/components/EnhancedBooksList";
import { EnhancedBibleVersionSelector } from "@/components/EnhancedBibleVersionSelector";
import { MyPlans } from "@/components/MyPlans";
import { FeaturedPlans } from "@/components/FeaturedPlans";
import { EnhancedPlansSection } from "@/components/EnhancedPlansSection";
import { EnhancedSearchSection } from "@/components/EnhancedSearchSection";
import { EnhancedOptionsSection } from "@/components/EnhancedOptionsSection";
import { SearchResults } from "@/components/SearchResults";
import { DailyVerse } from "@/components/DailyVerse";
import { useLastRead } from "@/hooks/useLastRead";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createPortal } from 'react-dom';
import { InicioSection } from "@/components/InicioSection";

const Index = () => {
  const [currentView, setCurrentView] = useState<'index' | 'enhanced-books' | 'enhanced-plans' | 'enhanced-search' | 'enhanced-options' | 'chapter' | 'search-results'>('index');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [currentVerseForExplanation, setCurrentVerseForExplanation] = useState<any>(null);
  const [selectedBibleVersion, setSelectedBibleVersion] = useState<string>('RVR1960');
  const [isScrolled, setIsScrolled] = useState(false);
  const { lastRead, updateLastRead } = useLastRead();
  const [initialTestament, setInitialTestament] = useState<'old' | 'new' | undefined>(undefined);
  const [readingTheme, setReadingTheme] = useState(localStorage.getItem('biblia-chapter-theme') || 'light');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Hook para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hook para escuchar cambios de versión de Biblia
  useEffect(() => {
    const handleVersionChange = (event: CustomEvent) => {
      setSelectedBibleVersion(event.detail);
    };

    window.addEventListener('bibleVersionChanged', handleVersionChange as EventListener);
    return () => window.removeEventListener('bibleVersionChanged', handleVersionChange as EventListener);
  }, []);

  useEffect(() => {
    const handler = () => setReadingTheme(localStorage.getItem('biblia-chapter-theme') || 'light');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  // Hook para escuchar navegación a resultados de búsqueda
  useEffect(() => {
    const handleNavigateToSearchResults = (event: CustomEvent) => {
      setSearchQuery(event.detail.query);
      setCurrentView('search-results');
    };

    window.addEventListener('navigateToSearchResults', handleNavigateToSearchResults as EventListener);
    return () => window.removeEventListener('navigateToSearchResults', handleNavigateToSearchResults as EventListener);
  }, []);

  // Mock user profile
  const userProfile = {
    name: "María González",
    avatar: "/placeholder.svg",
    streak: 15
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setSelectedChapter(1);
    updateLastRead(bookName, 1);
    setCurrentView('chapter');
  };

  const handleChapterSelect = (bookName: string, chapter: number) => {
    setSelectedBook(bookName);
    setSelectedChapter(chapter);
    setCurrentView('chapter');
    updateLastRead(bookName, chapter);
  };

  const handleBookChange = (bookName: string, chapter: number) => {
    setSelectedBook(bookName);
    setSelectedChapter(chapter);
    updateLastRead(bookName, chapter);
  };

  const handleExplainVerse = (verse: any) => {
    setCurrentVerseForExplanation(verse);
    handleViewChange('index');
  };

  const handleNavigateToVerse = (reference: string) => {
    handleViewChange('index');
  };

  const handleVersionChange = (version: string) => {
    setSelectedBibleVersion(version);
  };

  const handleBackToBooks = () => {
    handleViewChange('enhanced-books');
  };

  const handleNavigateToTestament = (testament: 'old' | 'new') => {
    setCurrentView('enhanced-books');
    setInitialTestament(testament);
    console.log(`Navegando al ${testament === 'old' ? 'Antiguo' : 'Nuevo'} Testamento`);
  };

  const handleViewChange = (view: typeof currentView) => {
    setCurrentView(view);
    setInitialTestament(undefined); // Limpiar testamento inicial
  };

  const handleNavigateToSearchResults = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search-results');
  };

  const handleBackToSearch = () => {
    setCurrentView('enhanced-search');
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    // Simular resultados de búsqueda
    const mockResults = [
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
      }
    ];
    setSearchResults(mockResults);
  };

  const navigationItems = [
    { id: 'index', icon: Home, label: 'Inicio' },
    { id: 'enhanced-books', icon: Book, label: 'Biblia' },
    { id: 'enhanced-plans', icon: Calendar, label: 'Planes' },
    { id: 'enhanced-search', icon: Search, label: 'Buscar' },
    { id: 'enhanced-options', icon: Settings, label: 'Opciones' }
  ];

  const getThemeStyles = (theme) => {
    const themes = {
      light: { background: 'bg-white', text: 'text-gray-900' },
      dark: { background: 'bg-gray-900', text: 'text-white' },
    };
    return themes[theme] || themes['light'];
  };

  const renderContent = () => {
    switch (currentView) {
      case 'enhanced-books':
        return (
          <EnhancedBooksList 
            onBookSelect={handleBookSelect}
            onChapterSelect={handleChapterSelect}
            currentBook={selectedBook}
            currentChapter={selectedChapter}
            initialTestament={initialTestament}
          />
        );
      case 'chapter':
        return (
          <ChapterReader 
            book={selectedBook} 
            chapter={selectedChapter}
            selectedVersion={selectedBibleVersion}
            onChapterChange={(chapter) => {
              setSelectedChapter(chapter);
              updateLastRead(selectedBook, chapter);
            }}
            onBookChange={handleBookChange}
            onBackToBooks={handleBackToBooks}
            onNavigateToTestament={handleNavigateToTestament}
          />
        );
      case 'enhanced-plans':
        return <EnhancedPlansSection />;
      case 'enhanced-search':
        return <EnhancedSearchSection onNavigateToResults={handleNavigateToSearchResults} />;
      case 'search-results':
        return (
          <SearchResults 
            query={searchQuery}
            results={searchResults}
            onSearch={handleSearch}
            onBackToSearch={handleBackToSearch}
          />
        );
      case 'enhanced-options':
        return <EnhancedOptionsSection />;
      case 'index':
      default:
        return (
          <InicioSection
            lastRead={lastRead}
            handleChapterSelect={handleChapterSelect}
            setCurrentView={setCurrentView}
            handleExplainVerse={handleExplainVerse}
            selectedBibleVersion={selectedBibleVersion}
          />
        );
    }
  };

  const renderBottomNavigation = () => {
    const theme = localStorage.getItem('theme-global') || 'light';
    const nav = (
      <nav
        className={[
          'fixed',
          'bottom-0',
          'left-0',
          'right-0',
          'z-50',
          'border-t',
          'transition-all',
          'duration-300',
          'bg-background',
          'border-border',
        ].join(' ')}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto mb-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            let activeBtnClass = '';
            let activeTextClass = '';
            if (isActive) {
              if (theme === 'light') {
                activeBtnClass = 'bg-biblical-purple-light';
                activeTextClass = 'text-biblical-purple';
              } else if (theme === 'dark') {
                activeBtnClass = 'bg-gray-800';
                activeTextClass = 'text-yellow-300';
              } else {
                activeBtnClass = '';
                activeTextClass = 'text-foreground';
              }
            } else {
              activeBtnClass = '';
              activeTextClass = 'text-foreground';
            }
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (item.id === 'enhanced-books') {
                    if (lastRead) {
                      handleChapterSelect(lastRead.book, lastRead.chapter);
                    } else {
                      setCurrentView('enhanced-books');
                    }
                  } else if (item.id === 'index') {
                    setCurrentView('index');
                  } else {
                    setCurrentView(item.id as any);
                  }
                }}
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-2xl transition-all duration-200 ${activeBtnClass}`}
              >
                <Icon className={`h-5 w-5 ${activeTextClass}`} />
                <span className={`text-xs font-medium ${activeTextClass}`}>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    );
    return createPortal(nav, document.body);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header específico para la página de inicio */}
      {currentView === 'index' && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Lado izquierdo - Hoy */}
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg">
                  Hoy
                </h1>
              </div>
              
              {/* Lado derecho - Iconos */}
              <div className="flex items-center gap-3">
                {/* Icono de racha */}
                <div className="flex items-center gap-1 bg-biblical-orange-light px-2 py-1 rounded-full">
                  <Flame className="text-biblical-orange h-4 w-4" />
                  <span className="font-semibold text-biblical-orange text-sm">
                    {userProfile.streak}
                  </span>
                </div>
                
                {/* Icono de notificaciones */}
                <Button variant="ghost" size="sm" className="p-2">
                  <Bell className="text-muted-foreground h-5 w-5" />
                </Button>
                
                {/* Avatar del usuario */}
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-biblical-purple text-white text-sm">
                    {getUserInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={`max-w-4xl mx-auto min-h-[calc(100vh-140px)] ${currentView === 'index' ? 'pt-20' : 'pt-4'} pb-28`}>
        {renderContent()}
      </main>
      {renderBottomNavigation()}
    </div>
  );
};

export default Index;
