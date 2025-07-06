import { Book, Search } from "lucide-react";
import { DailyVerse } from "@/components/DailyVerse";
import { MyPlans } from "@/components/MyPlans";
import { FeaturedPlans } from "@/components/FeaturedPlans";
import { Button } from "@/components/ui/button";

export function InicioSection({
  lastRead,
  handleChapterSelect,
  setCurrentView,
  handleExplainVerse,
  selectedBibleVersion
}: {
  lastRead: any;
  handleChapterSelect: (book: string, chapter: number) => void;
  setCurrentView: (view: 'index' | 'enhanced-books' | 'enhanced-plans' | 'enhanced-search' | 'enhanced-options' | 'chapter' | 'search-results') => void;
  handleExplainVerse: (verse: any) => void;
  selectedBibleVersion: string;
}) {
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