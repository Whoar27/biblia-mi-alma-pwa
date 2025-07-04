import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Book, Calendar, Search, Settings, AlertCircle } from "lucide-react";
import { BooksList } from "@/components/BooksList";
import { ChapterReader } from "@/components/ChapterReader";
import { FavoriteVerses } from "@/components/FavoriteVerses";
import { VerseExplanation } from "@/components/VerseExplanation";
import { BibleVersionSelector } from "@/components/BibleVersionSelector";
import { PageHeader } from "@/components/PageHeader";
import { EnhancedBooksList } from "@/components/EnhancedBooksList";
import { EnhancedBibleVersionSelector } from "@/components/EnhancedBibleVersionSelector";
import { MyPlans } from "@/components/MyPlans";
import { FeaturedPlans } from "@/components/FeaturedPlans";
import { EnhancedPlansSection } from "@/components/EnhancedPlansSection";
import { EnhancedSearchSection } from "@/components/EnhancedSearchSection";
import { EnhancedOptionsSection } from "@/components/EnhancedOptionsSection";
import { DailyVerse } from "@/components/DailyVerse";
import { useLastRead } from "@/hooks/useLastRead";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'books' | 'chapter' | 'search' | 'plans' | 'options' | 'explanation' | 'versions' | 'profile' | 'stats' | 'enhanced-books' | 'enhanced-versions'>('home');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [currentVerseForExplanation, setCurrentVerseForExplanation] = useState<any>(null);
  const [selectedBibleVersion, setSelectedBibleVersion] = useState<string>('RVR1960');
  const { lastRead, updateLastRead } = useLastRead();

  // Mock user profile
  const userProfile = {
    name: "María González",
    avatar: "/placeholder.svg",
    streak: 15
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
    updateLastRead(bookName, chapter);
    setCurrentView('chapter');
  };

  const handleExplainVerse = (verse: any) => {
    setCurrentVerseForExplanation(verse);
    setCurrentView('explanation');
  };

  const handleNavigateToVerse = (reference: string) => {
    setCurrentView('home');
  };

  const handleVersionChange = (version: string) => {
    setSelectedBibleVersion(version);
  };

  const handleBackToBooks = () => {
    setCurrentView('enhanced-books');
  };

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'books', icon: Book, label: 'Biblia' },
    { id: 'plans', icon: Calendar, label: 'Planes' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'options', icon: Settings, label: 'Opciones' }
  ];

  const getPageForHeader = (): 'home' | 'bible' | 'plans' | 'search' | 'options' => {
    if (currentView === 'chapter' || currentView === 'enhanced-books' || currentView === 'enhanced-versions') {
      return 'bible';
    }
    if (currentView === 'profile' || currentView === 'stats' || currentView === 'explanation' || currentView === 'versions') {
      return 'home';
    }
    return currentView as 'home' | 'bible' | 'plans' | 'search' | 'options';
  };

  const renderContent = () => {
    switch (currentView) {
      case 'books':
        if (lastRead) {
          handleChapterSelect(lastRead.book, lastRead.chapter);
          return null;
        }
        return <BooksList onBookSelect={handleBookSelect} />;
      case 'enhanced-books':
        return (
          <EnhancedBooksList 
            onBookSelect={handleBookSelect}
            onChapterSelect={handleChapterSelect}
            currentBook={selectedBook}
            currentChapter={selectedChapter}
          />
        );
      case 'enhanced-versions':
        return (
          <EnhancedBibleVersionSelector 
            selectedVersion={selectedBibleVersion}
            onVersionChange={handleVersionChange}
            onBack={() => setCurrentView('books')}
          />
        );
      case 'chapter':
        return (
          <ChapterReader 
            book={selectedBook} 
            chapter={selectedChapter}
            onChapterChange={(chapter) => {
              setSelectedChapter(chapter);
              updateLastRead(selectedBook, chapter);
            }}
            onBackToBooks={handleBackToBooks}
          />
        );
      case 'search':
        return <EnhancedSearchSection />;
      case 'plans':
        return <EnhancedPlansSection />;
      case 'options':
        return <EnhancedOptionsSection />;
      case 'explanation':
        return (
          <VerseExplanation 
            verse={currentVerseForExplanation}
            onBack={() => setCurrentView('home')}
            onNavigateToVerse={handleNavigateToVerse}
          />
        );
      case 'versions':
        return (
          <BibleVersionSelector 
            selectedVersion={selectedBibleVersion}
            onVersionChange={handleVersionChange}
          />
        );
      case 'profile':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
            <p>Detalles del perfil en desarrollo...</p>
          </div>
        );
      case 'stats':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Mis Estadísticas</h2>
            <p>Estadísticas detalladas en desarrollo...</p>
          </div>
        );
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
                className="bg-gradient-to-br from-biblical-purple-light to-biblical-blue-light p-6 rounded-full border shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
                onClick={() => {
                  if (lastRead) {
                    handleChapterSelect(lastRead.book, lastRead.chapter);
                  } else {
                    setCurrentView('books');
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
                className="bg-gradient-to-br from-biblical-gold-light to-biblical-orange-light p-6 rounded-full border shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
                onClick={() => setCurrentView('search')}
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

  const renderBottomNavigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
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
                if (item.id === 'books') {
                  if (lastRead) {
                    handleChapterSelect(lastRead.book, lastRead.chapter);
                  } else {
                    setCurrentView('enhanced-books');
                  }
                } else {
                  setCurrentView(item.id as any);
                }
              }}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-full ${
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader 
        page={getPageForHeader()}
        onProfileClick={() => setCurrentView('profile')}
        onStatsClick={() => setCurrentView('stats')}
        userProfile={userProfile}
        currentBook={selectedBook}
        currentChapter={selectedChapter}
        selectedVersion={selectedBibleVersion}
        onBookChapterClick={() => setCurrentView('enhanced-books')}
        onVersionClick={() => setCurrentView('enhanced-versions')}
      />
      
      <main className="max-w-4xl mx-auto min-h-[calc(100vh-140px)] pt-20">
        {renderContent()}
      </main>
      {renderBottomNavigation()}
    </div>
  );
};

export default Index;
