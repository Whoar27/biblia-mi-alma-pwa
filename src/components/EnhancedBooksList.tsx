import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, BookOpen, AlertCircle } from "lucide-react";
import React from "react";

interface EnhancedBooksListProps {
  onBookSelect: (bookName: string) => void;
  onChapterSelect: (bookName: string, chapter: number) => void;
  currentBook?: string;
  currentChapter?: number;
  initialTestament?: 'old' | 'new';
}

const oldTestamentBooks = [
  { name: "Génesis", chapters: 50, abbrev: "Gn", color: "biblical-green" },
  { name: "Éxodo", chapters: 40, abbrev: "Ex", color: "biblical-blue" },
  { name: "Levítico", chapters: 27, abbrev: "Lv", color: "biblical-purple" },
  { name: "Números", chapters: 36, abbrev: "Nm", color: "biblical-orange" },
  { name: "Deuteronomio", chapters: 34, abbrev: "Dt", color: "biblical-red" },
  { name: "Josué", chapters: 24, abbrev: "Jos", color: "biblical-green" },
  { name: "Jueces", chapters: 21, abbrev: "Jue", color: "biblical-blue" },
  { name: "Rut", chapters: 4, abbrev: "Rt", color: "biblical-purple" },
  { name: "1 Samuel", chapters: 31, abbrev: "1S", color: "biblical-orange" },
  { name: "2 Samuel", chapters: 24, abbrev: "2S", color: "biblical-red" },
  { name: "1 Reyes", chapters: 22, abbrev: "1R", color: "biblical-green" },
  { name: "2 Reyes", chapters: 25, abbrev: "2R", color: "biblical-blue" },
  { name: "1 Crónicas", chapters: 29, abbrev: "1Cr", color: "biblical-purple" },
  { name: "2 Crónicas", chapters: 36, abbrev: "2Cr", color: "biblical-orange" },
  { name: "Esdras", chapters: 10, abbrev: "Esd", color: "biblical-red" },
  { name: "Nehemías", chapters: 13, abbrev: "Neh", color: "biblical-green" },
  { name: "Ester", chapters: 10, abbrev: "Est", color: "biblical-blue" },
  { name: "Job", chapters: 42, abbrev: "Job", color: "biblical-purple" },
  { name: "Salmos", chapters: 150, abbrev: "Sal", color: "biblical-orange" },
  { name: "Proverbios", chapters: 31, abbrev: "Pr", color: "biblical-red" },
  { name: "Eclesiastés", chapters: 12, abbrev: "Ec", color: "biblical-green" },
  { name: "Cantares", chapters: 8, abbrev: "Cnt", color: "biblical-blue" },
  { name: "Isaías", chapters: 66, abbrev: "Is", color: "biblical-purple" },
  { name: "Jeremías", chapters: 52, abbrev: "Jer", color: "biblical-orange" },
  { name: "Lamentaciones", chapters: 5, abbrev: "Lam", color: "biblical-red" },
  { name: "Ezequiel", chapters: 48, abbrev: "Ez", color: "biblical-green" },
  { name: "Daniel", chapters: 12, abbrev: "Dn", color: "biblical-blue" },
  { name: "Oseas", chapters: 14, abbrev: "Os", color: "biblical-purple" },
  { name: "Joel", chapters: 3, abbrev: "Jl", color: "biblical-orange" },
  { name: "Amós", chapters: 9, abbrev: "Am", color: "biblical-red" },
  { name: "Abdías", chapters: 1, abbrev: "Abd", color: "biblical-green" },
  { name: "Jonás", chapters: 4, abbrev: "Jon", color: "biblical-blue" },
  { name: "Miqueas", chapters: 7, abbrev: "Miq", color: "biblical-purple" },
  { name: "Nahúm", chapters: 3, abbrev: "Nah", color: "biblical-orange" },
  { name: "Habacuc", chapters: 3, abbrev: "Hab", color: "biblical-red" },
  { name: "Sofonías", chapters: 3, abbrev: "Sof", color: "biblical-green" },
  { name: "Hageo", chapters: 2, abbrev: "Hag", color: "biblical-blue" },
  { name: "Zacarías", chapters: 14, abbrev: "Zac", color: "biblical-purple" },
  { name: "Malaquías", chapters: 4, abbrev: "Mal", color: "biblical-orange" }
];

const newTestamentBooks = [
  { name: "Mateo", chapters: 28, abbrev: "Mt", color: "biblical-gold" },
  { name: "Marcos", chapters: 16, abbrev: "Mc", color: "biblical-blue" },
  { name: "Lucas", chapters: 24, abbrev: "Lc", color: "biblical-green" },
  { name: "Juan", chapters: 21, abbrev: "Jn", color: "biblical-purple" },
  { name: "Hechos", chapters: 28, abbrev: "Hch", color: "biblical-orange" },
  { name: "Romanos", chapters: 16, abbrev: "Ro", color: "biblical-red" },
  { name: "1 Corintios", chapters: 16, abbrev: "1Co", color: "biblical-green" },
  { name: "2 Corintios", chapters: 13, abbrev: "2Co", color: "biblical-blue" },
  { name: "Gálatas", chapters: 6, abbrev: "Ga", color: "biblical-purple" },
  { name: "Efesios", chapters: 6, abbrev: "Ef", color: "biblical-orange" },
  { name: "Filipenses", chapters: 4, abbrev: "Fil", color: "biblical-red" },
  { name: "Colosenses", chapters: 4, abbrev: "Col", color: "biblical-green" },
  { name: "1 Tesalonicenses", chapters: 5, abbrev: "1Ts", color: "biblical-blue" },
  { name: "2 Tesalonicenses", chapters: 3, abbrev: "2Ts", color: "biblical-purple" },
  { name: "1 Timoteo", chapters: 6, abbrev: "1Ti", color: "biblical-orange" },
  { name: "2 Timoteo", chapters: 4, abbrev: "2Ti", color: "biblical-red" },
  { name: "Tito", chapters: 3, abbrev: "Tit", color: "biblical-green" },
  { name: "Filemón", chapters: 1, abbrev: "Flm", color: "biblical-blue" },
  { name: "Hebreos", chapters: 13, abbrev: "Heb", color: "biblical-purple" },
  { name: "Santiago", chapters: 5, abbrev: "Stg", color: "biblical-orange" },
  { name: "1 Pedro", chapters: 5, abbrev: "1P", color: "biblical-red" },
  { name: "2 Pedro", chapters: 3, abbrev: "2P", color: "biblical-green" },
  { name: "1 Juan", chapters: 5, abbrev: "1Jn", color: "biblical-blue" },
  { name: "2 Juan", chapters: 1, abbrev: "2Jn", color: "biblical-purple" },
  { name: "3 Juan", chapters: 1, abbrev: "3Jn", color: "biblical-orange" },
  { name: "Judas", chapters: 1, abbrev: "Jud", color: "biblical-red" },
  { name: "Apocalipsis", chapters: 22, abbrev: "Ap", color: "biblical-green" }
];

export const EnhancedBooksList = ({ 
  onBookSelect, 
  onChapterSelect, 
  currentBook, 
  currentChapter, 
  initialTestament
}: EnhancedBooksListProps) => {
  const [openBooks, setOpenBooks] = useState<Set<string>>(new Set());
  const [activeTestament, setActiveTestament] = useState<'old' | 'new'>(initialTestament || 'old');

  // Cambiar al testamento correcto cuando se recibe initialTestament
  useEffect(() => {
    if (initialTestament) {
      setActiveTestament(initialTestament);
    }
  }, [initialTestament]);

  const toggleBook = (bookName: string) => {
    const newOpenBooks = new Set(openBooks);
    if (newOpenBooks.has(bookName)) {
      newOpenBooks.delete(bookName);
    } else {
      newOpenBooks.add(bookName);
    }
    setOpenBooks(newOpenBooks);
  };

  const renderBookCard = (book: typeof oldTestamentBooks[0]) => (
    <Card key={book.name} className="hover:shadow-md transition-shadow">
      <Collapsible 
        open={openBooks.has(book.name)}
        onOpenChange={() => toggleBook(book.name)}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${book.color}`} />
                <div>
                  <CardTitle className="text-lg">{book.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{book.abbrev}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{book.chapters} cap.</Badge>
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  openBooks.has(book.name) ? 'rotate-180' : ''
                }`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 pt-2">
              {/* Capítulo 0 - Introducción */}
              <Button
                variant={
                  currentBook === book.name && currentChapter === 0 
                    ? "default" 
                    : "outline"
                }
                size="sm"
                onClick={() => onChapterSelect(book.name, 0)}
                className="h-8 flex items-center justify-center"
              >
                <AlertCircle className="h-3 w-3" />
              </Button>
              
              {/* Capítulos regulares */}
              {Array.from({ length: book.chapters }, (_, i) => i + 1).map(chapter => (
                <Button
                  key={chapter}
                  variant={
                    currentBook === book.name && currentChapter === chapter 
                      ? "default" 
                      : "outline"
                  }
                  size="sm"
                  onClick={() => onChapterSelect(book.name, chapter)}
                  className="h-8"
                >
                  {chapter}
                </Button>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-biblical-purple" />
        <h2 className="text-xl font-bold">Libros de la Biblia</h2>
      </div>
      
      <Tabs value={activeTestament} onValueChange={(value) => setActiveTestament(value as 'old' | 'new')} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          {['old', 'new'].map((testament) => (
            <TabsTrigger
              key={testament}
              value={testament}
              className={testament === 'old' ? 'text-biblical-blue' : 'text-biblical-purple'}
            >
              {testament === 'old' ? 'Antiguo Testamento' : 'Nuevo Testamento'}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="old">
          <div className="space-y-3">
            {oldTestamentBooks.map(renderBookCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="space-y-3">
            {newTestamentBooks.map(renderBookCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
