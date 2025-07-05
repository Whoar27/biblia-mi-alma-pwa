import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Highlighter, Heart, MessageSquare, Share2, Image } from "lucide-react";

interface VerseOptionsPanelProps {
  verse: { verse: number; text: string };
  bookName: string;
  chapter: number;
  onHighlight: () => void;
  onSave: () => void;
  onAddNote: () => void;
  onShare: () => void;
  onCreateImage: () => void;
  onClose: () => void;
  theme?: 'light' | 'dark' | 'sepia';
}

const themeClasses = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-900 text-white',
  sepia: 'bg-amber-50 text-amber-900',
};

export const VerseOptionsPanel = ({
  verse,
  bookName,
  chapter,
  onHighlight,
  onSave,
  onAddNote,
  onShare,
  onCreateImage,
  onClose,
  theme = 'light',
}: VerseOptionsPanelProps) => {
  const classes = themeClasses[theme] || themeClasses['light'];
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 border-t ${classes}`}>
      <Card className={`rounded-none border-0 ${classes}`}>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground mb-3 text-center">
            {bookName} {chapter}:{verse.verse}
          </div>
          <div className="flex justify-around gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onHighlight}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Highlighter className="h-5 w-5" />
              <span className="text-xs">Resaltar</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Heart className="h-5 w-5" />
              <span className="text-xs">Guardar</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddNote}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Nota</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Share2 className="h-5 w-5" />
              <span className="text-xs">Compartir</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCreateImage}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <Image className="h-5 w-5" />
              <span className="text-xs">Imagen</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
