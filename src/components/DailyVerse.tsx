
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, BookOpen, MessageCircle, Share2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DailyVerseProps {
  onExplainVerse: (verse: any) => void;
  selectedVersion: string;
}

const dailyVerses = [
  {
    id: 1,
    reference: "Juan 3:16",
    text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
    theme: "El Amor de Dios",
    date: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 2,
    reference: "Filipenses 4:13",
    text: "Todo lo puedo en Cristo que me fortalece.",
    theme: "Fortaleza en Cristo",
    date: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 3,
    reference: "Salmos 23:1",
    text: "Jehová es mi pastor; nada me faltará.",
    theme: "Confianza en Dios",
    date: new Date().toLocaleDateString('es-ES')
  }
];

export const DailyVerse = ({ onExplainVerse, selectedVersion }: DailyVerseProps) => {
  const [currentVerse] = useState(dailyVerses[0]); // En producción sería basado en la fecha
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Versículo del día - ${currentVerse.reference}`,
        text: `${currentVerse.text} - ${currentVerse.reference}`
      });
    } else {
      navigator.clipboard.writeText(`${currentVerse.text} - ${currentVerse.reference}`);
      toast({
        title: "Copiado",
        description: "El versículo fue copiado al portapapeles"
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido de favoritos" : "Agregado a favoritos",
      description: `El versículo fue ${isFavorite ? "removido de" : "agregado a"} favoritos`
    });
  };

  return (
    <Card className="mb-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Versículo del Día
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {selectedVersion}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{currentVerse.date}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            {currentVerse.theme}
          </Badge>
          <blockquote className="text-lg leading-relaxed font-medium text-foreground border-l-4 border-primary pl-4 italic">
            "{currentVerse.text}"
          </blockquote>
          <p className="text-right text-primary font-semibold">
            — {currentVerse.reference}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button
            onClick={() => onExplainVerse(currentVerse)}
            className="flex-1 min-w-fit"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Ver Explicación
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFavorite}
            className={isFavorite ? "text-red-500 border-red-200" : ""}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
