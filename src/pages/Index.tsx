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
import { DailyVerse } from "@/components/DailyVerse";
import { useLastRead } from "@/hooks/useLastRead";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const [currentView, setCurrentView] = useState<'index' | 'enhanced-books' | 'enhanced-plans' | 'enhanced-search' | 'enhanced-options' | 'chapter'>('index');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [currentVerseForExplanation, setCurrentVerseForExplanation] = useState<any>(null);
  const [selectedBibleVersion, setSelectedBibleVersion] = useState<string>('RVR1960');
  const [isScrolled, setIsScrolled] = useState(false);
  const { lastRead, updateLastRead } = useLastRead();
  const [initialTestament, setInitialTestament] = useState<'old' | 'new' | undefined>(undefined);

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

  const navigationItems = [
    { id: 'index', icon: Home, label: 'Inicio' },
    { id: 'enhanced-books', icon: Book, label: 'Biblia' },
    { id: 'enhanced-plans', icon: Calendar, label: 'Planes' },
    { id: 'enhanced-search', icon: Search, label: 'Buscar' },
    { id: 'enhanced-options', icon: Settings, label: 'Opciones' }
  ];

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
        return <EnhancedSearchSection />;
      case 'enhanced-options':
        return <EnhancedOptionsSection />;
      case 'index':
      default:
        return (
          <div className="p-4">
            <DailyVerse 
              onExplainVerse={handleExplainVerse}
              selectedVersion={selectedBibleVersion}
            />
            
            <MyPlans />
            <FeaturedPlans />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-8">
              <div 
                className="bg-gradient-to-br from-biblical-purple-light to-biblical-blue-light p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
                onClick={() => {
                  if (lastRead) {
                    handleChapterSelect(lastRead.book, lastRead.chapter);
                  } else {
                    setCurrentView('enhanced-books');
                  }
                }}
              >
                <Book className="h-12 w-12 mb-3 text-biblical-purple" />
                <h3 className="font-semibold text-lg mb-2">
                  {lastRead ? `Continuar: ${lastRead.book} ${lastRead.chapter}` : 'Leer la Biblia'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {lastRead 
                    ? 'Continúa donde te quedaste la última vez' 
                    : 'Explora todos los libros de la Biblia'
                  }
                </p>
              </div>
              
              <div 
                className="bg-gradient-to-br from-biblical-gold-light to-biblical-orange-light p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
                onClick={() => setCurrentView('enhanced-search')}
              >
                <Search className="h-12 w-12 mb-3 text-biblical-orange" />
                <h3 className="font-semibold text-lg mb-2">Buscar Versículos</h3>
                <p className="text-muted-foreground text-sm">Encuentra versículos específicos y descubre contenido popular</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderBottomNavigation = () => {
    // Solo usar el tema cuando estamos en la sección de Biblia
    const isInBibleSection = currentView === 'chapter' || currentView === 'enhanced-books';
    
    return (
      <nav className={`fixed bottom-0 left-0 right-0 border-t transition-all duration-300 ${
        isInBibleSection 
          ? 'bg-background border-border' 
          : 'bg-background border-border'
      }`}>
        <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
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
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-2xl transition-all duration-200 ${
                  isActive 
                    ? 'text-biblical-purple bg-biblical-purple-light' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header específico para la página de inicio */}
      {currentView === 'index' && (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Lado izquierdo - Hoy */}
              <div className="flex items-center gap-2">
                <h1 className={`font-bold ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                  Hoy
                </h1>
              </div>
              
              {/* Lado derecho - Iconos */}
              <div className="flex items-center gap-3">
                {/* Icono de racha */}
                <div className="flex items-center gap-1 bg-biblical-orange-light px-2 py-1 rounded-full">
                  <Flame className={`text-biblical-orange ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                  <span className={`font-semibold text-biblical-orange ${isScrolled ? 'text-sm' : 'text-base'}`}>
                    {userProfile.streak}
                  </span>
                </div>
                
                {/* Icono de notificaciones */}
                <Button variant="ghost" size="sm" className="p-2">
                  <Bell className={`text-muted-foreground ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
                </Button>
                
                {/* Avatar del usuario */}
                <Avatar className={`${isScrolled ? 'h-8 w-8' : 'h-10 w-10'}`}>
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

      <main className={`max-w-4xl mx-auto min-h-[calc(100vh-140px)] ${currentView === 'index' ? 'pt-20' : 'pt-4'}`}>
        {renderContent()}
      </main>
      {renderBottomNavigation()}
    </div>
  );
};

export default Index;
