
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Book, Calendar, Search, Settings } from "lucide-react";
import { BooksList } from "@/components/BooksList";
import { ChapterReader } from "@/components/ChapterReader";
import { SearchResults } from "@/components/SearchResults";
import { FavoriteVerses } from "@/components/FavoriteVerses";
import { ReadingPlans } from "@/components/ReadingPlans";
import { OptionsMenu } from "@/components/OptionsMenu";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'books' | 'chapter' | 'search' | 'plans' | 'options'>('home');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleBookSelect = (bookName: string) => {
    setSelectedBook(bookName);
    setSelectedChapter(1);
    setCurrentView('chapter');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchResults([]);
    setCurrentView('search');
  };

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'books', icon: Book, label: 'Biblia' },
    { id: 'plans', icon: Calendar, label: 'Planes' },
    { id: 'search', icon: Search, label: 'Buscar' },
    { id: 'options', icon: Settings, label: 'Opciones' }
  ];

  const renderHeader = () => (
    <header className="bg-primary text-primary-foreground p-4 shadow-lg">
      <div className="flex items-center justify-center max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          <h1 className="text-xl font-bold">Mi Alma Biblia</h1>
        </div>
      </div>
    </header>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'books':
        return <BooksList onBookSelect={handleBookSelect} />;
      case 'chapter':
        return (
          <ChapterReader 
            book={selectedBook} 
            chapter={selectedChapter}
            onChapterChange={setSelectedChapter}
          />
        );
      case 'search':
        return <SearchResults query={searchQuery} results={searchResults} onSearch={handleSearch} />;
      case 'plans':
        return <ReadingPlans />;
      case 'options':
        return <OptionsMenu />;
      default:
        return (
          <div className="p-4">
            <div className="text-center py-8">
              <Book className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4 text-foreground">Bienvenido a Mi Alma Biblia</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Explora la Palabra de Dios con esta aplicación moderna diseñada para tu crecimiento espiritual.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentView('books')}>
                <Book className="h-12 w-12 mb-3 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Leer la Biblia</h3>
                <p className="text-muted-foreground text-sm">Explora todos los libros de la Biblia con una interfaz moderna y fácil de usar.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentView('plans')}>
                <Calendar className="h-12 w-12 mb-3 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Planes de Lectura</h3>
                <p className="text-muted-foreground text-sm">Sigue planes estructurados para leer la Biblia de manera organizada.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentView('search')}>
                <Search className="h-12 w-12 mb-3 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Buscar Versículos</h3>
                <p className="text-muted-foreground text-sm">Encuentra versículos específicos usando palabras clave o referencias.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <Settings className="h-12 w-12 mb-3 text-primary" />
                <h3 className="font-semibold text-lg mb-2">Personalizar</h3>
                <p className="text-muted-foreground text-sm">Configura la aplicación según tus preferencias de lectura.</p>
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
              onClick={() => setCurrentView(item.id as any)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
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
      {renderHeader()}
      <main className="max-w-4xl mx-auto min-h-[calc(100vh-140px)]">
        {renderContent()}
      </main>
      {renderBottomNavigation()}
    </div>
  );
};

export default Index;
