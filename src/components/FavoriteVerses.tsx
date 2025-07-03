
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FavoriteVerses = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simular carga de favoritos guardados
    const mockFavorites = [
      {
        id: "1",
        book: "Juan",
        chapter: 3,
        verse: 16,
        text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
        dateAdded: new Date().toLocaleDateString()
      },
      {
        id: "2",
        book: "Salmos",
        chapter: 23,
        verse: 1,
        text: "Jehová es mi pastor; nada me faltará.",
        dateAdded: new Date().toLocaleDateString()
      }
    ];
    setFavorites(mockFavorites);
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    toast({
      title: "Versículo removido",
      description: "El versículo fue removido de favoritos"
    });
  };

  const shareVerse = (verse: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${verse.book} ${verse.chapter}:${verse.verse}`,
        text: verse.text
      });
    } else {
      navigator.clipboard.writeText(`${verse.book} ${verse.chapter}:${verse.verse} - ${verse.text}`);
      toast({
        title: "Copiado",
        description: "El versículo fue copiado al portapapeles"
      });
    }
  };

  return (
    <div className="p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Versículos Favoritos
          </CardTitle>
        </CardHeader>
      </Card>

      {favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((verse) => (
            <Card key={verse.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">
                    {verse.book} {verse.chapter}:{verse.verse}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {verse.dateAdded}
                  </span>
                </div>
                <p className="text-base leading-relaxed mb-3">{verse.text}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareVerse(verse)}
                  >
                    <Share2 className="h-4 w-4" />
                    Compartir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFavorite(verse.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-2">
            No tienes versículos favoritos aún
          </p>
          <p className="text-sm text-muted-foreground">
            Marca versículos como favoritos mientras lees para encontrarlos aquí
          </p>
        </div>
      )}
    </div>
  );
};
