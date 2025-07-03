
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search, Heart, Settings, Menu } from "lucide-react";
import { BooksList } from "@/components/BooksList";
import { ChapterReader } from "@/components/ChapterReader";
import { SearchResults } from "@/components/SearchResults";
import { FavoriteVerses } from "@/components/FavoriteVerses";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'books' | 'chapter' | 'search' | 'favorites'>('home');
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
    // Aquí implementaremos la búsqueda real más adelante
    setSearchResults([]);
    setCurrentView('search');
  };

  const renderHeader = () => (
    <header className="bg-primary text-primary-foreground p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          <h1 className="text-xl font-bold">Mi Alma Biblia</h1>
        </div>
        {currentView !== 'home' && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentView('home')}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            Inicio
          </Button>
        )}
      </div>
    </header>
  );

  const renderNavigation = () => (
    <nav className="bg-secondary p-4">
      <div className="flex justify-center gap-2 max-w-4xl mx-auto flex-wrap">
        <Button 
          variant={currentView === 'books' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setCurrentView('books')}
          className="flex items-center gap-2"
        >
          <Book className="h-4 w-4" />
          Libros
        </Button>
        <Button 
          variant={currentView === 'search' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setCurrentView('search')}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Buscar
        </Button>
        <Button 
          variant={currentView === 'favorites' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setCurrentView('favorites')}
          className="flex items-center gap-2"
        >
          <Heart className="h-4 w-4" />
          Favoritos
        </Button>
      </div>
    </nav>
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
      case 'favorites':
        return <FavoriteVerses />;
      default:
        return (
          <div className="text-center py-12 px-4">
            <Book className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4 text-foreground">Bienvenido a Mi Alma Biblia</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Explora la Palabra de Dios con esta aplicación moderna diseñada para tu crecimiento espiritual.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button onClick={() => setCurrentView('books')} className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Explorar Libros
              </Button>
              <Button variant="outline" onClick={() => setCurrentView('search')} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar Versículos
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      {renderNavigation()}
      <main className="max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
