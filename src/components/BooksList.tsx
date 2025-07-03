
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BooksListProps {
  onBookSelect: (bookName: string) => void;
}

const oldTestamentBooks = [
  { name: "Génesis", chapters: 50, abbrev: "Gn" },
  { name: "Éxodo", chapters: 40, abbrev: "Ex" },
  { name: "Levítico", chapters: 27, abbrev: "Lv" },
  { name: "Números", chapters: 36, abbrev: "Nm" },
  { name: "Deuteronomio", chapters: 34, abbrev: "Dt" },
  { name: "Josué", chapters: 24, abbrev: "Jos" },
  { name: "Jueces", chapters: 21, abbrev: "Jue" },
  { name: "Rut", chapters: 4, abbrev: "Rt" },
  { name: "1 Samuel", chapters: 31, abbrev: "1S" },
  { name: "2 Samuel", chapters: 24, abbrev: "2S" },
  { name: "1 Reyes", chapters: 22, abbrev: "1R" },
  { name: "2 Reyes", chapters: 25, abbrev: "2R" },
  { name: "1 Crónicas", chapters: 29, abbrev: "1Cr" },
  { name: "2 Crónicas", chapters: 36, abbrev: "2Cr" },
  { name: "Esdras", chapters: 10, abbrev: "Esd" },
  { name: "Nehemías", chapters: 13, abbrev: "Neh" },
  { name: "Ester", chapters: 10, abbrev: "Est" },
  { name: "Job", chapters: 42, abbrev: "Job" },
  { name: "Salmos", chapters: 150, abbrev: "Sal" },
  { name: "Proverbios", chapters: 31, abbrev: "Pr" },
  { name: "Eclesiastés", chapters: 12, abbrev: "Ec" },
  { name: "Cantares", chapters: 8, abbrev: "Cnt" },
  { name: "Isaías", chapters: 66, abbrev: "Is" },
  { name: "Jeremías", chapters: 52, abbrev: "Jer" },
  { name: "Lamentaciones", chapters: 5, abbrev: "Lam" },
  { name: "Ezequiel", chapters: 48, abbrev: "Ez" },
  { name: "Daniel", chapters: 12, abbrev: "Dn" },
  { name: "Oseas", chapters: 14, abbrev: "Os" },
  { name: "Joel", chapters: 3, abbrev: "Jl" },
  { name: "Amós", chapters: 9, abbrev: "Am" },
  { name: "Abdías", chapters: 1, abbrev: "Abd" },
  { name: "Jonás", chapters: 4, abbrev: "Jon" },
  { name: "Miqueas", chapters: 7, abbrev: "Miq" },
  { name: "Nahúm", chapters: 3, abbrev: "Nah" },
  { name: "Habacuc", chapters: 3, abbrev: "Hab" },
  { name: "Sofonías", chapters: 3, abbrev: "Sof" },
  { name: "Hageo", chapters: 2, abbrev: "Hag" },
  { name: "Zacarías", chapters: 14, abbrev: "Zac" },
  { name: "Malaquías", chapters: 4, abbrev: "Mal" }
];

const newTestamentBooks = [
  { name: "Mateo", chapters: 28, abbrev: "Mt" },
  { name: "Marcos", chapters: 16, abbrev: "Mc" },
  { name: "Lucas", chapters: 24, abbrev: "Lc" },
  { name: "Juan", chapters: 21, abbrev: "Jn" },
  { name: "Hechos", chapters: 28, abbrev: "Hch" },
  { name: "Romanos", chapters: 16, abbrev: "Ro" },
  { name: "1 Corintios", chapters: 16, abbrev: "1Co" },
  { name: "2 Corintios", chapters: 13, abbrev: "2Co" },
  { name: "Gálatas", chapters: 6, abbrev: "Ga" },
  { name: "Efesios", chapters: 6, abbrev: "Ef" },
  { name: "Filipenses", chapters: 4, abbrev: "Fil" },
  { name: "Colosenses", chapters: 4, abbrev: "Col" },
  { name: "1 Tesalonicenses", chapters: 5, abbrev: "1Ts" },
  { name: "2 Tesalonicenses", chapters: 3, abbrev: "2Ts" },
  { name: "1 Timoteo", chapters: 6, abbrev: "1Ti" },
  { name: "2 Timoteo", chapters: 4, abbrev: "2Ti" },
  { name: "Tito", chapters: 3, abbrev: "Tit" },
  { name: "Filemón", chapters: 1, abbrev: "Flm" },
  { name: "Hebreos", chapters: 13, abbrev: "Heb" },
  { name: "Santiago", chapters: 5, abbrev: "Stg" },
  { name: "1 Pedro", chapters: 5, abbrev: "1P" },
  { name: "2 Pedro", chapters: 3, abbrev: "2P" },
  { name: "1 Juan", chapters: 5, abbrev: "1Jn" },
  { name: "2 Juan", chapters: 1, abbrev: "2Jn" },
  { name: "3 Juan", chapters: 1, abbrev: "3Jn" },
  { name: "Judas", chapters: 1, abbrev: "Jud" },
  { name: "Apocalipsis", chapters: 22, abbrev: "Ap" }
];

export const BooksList = ({ onBookSelect }: BooksListProps) => {
  const renderBookCard = (book: typeof oldTestamentBooks[0]) => (
    <Card key={book.name} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onBookSelect(book.name)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">{book.name}</h3>
            <p className="text-sm text-muted-foreground">{book.abbrev}</p>
          </div>
          <Badge variant="secondary">{book.chapters} cap.</Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4">
      <Tabs defaultValue="old" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="old">Antiguo Testamento</TabsTrigger>
          <TabsTrigger value="new">Nuevo Testamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="old">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {oldTestamentBooks.map(renderBookCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="new">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {newTestamentBooks.map(renderBookCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
