import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Highlighter, Heart, MessageSquare, Share2, Image } from "lucide-react";
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface VerseOptionsPanelProps {
  verse: { verse: number; text: string };
  bookName: string;
  chapter: number;
  onHighlight: (color: string) => void;
  onSave: () => void;
  onAddNote: () => void;
  onShare: () => void;
  onCreateImage: () => void;
  onClose: () => void;
}

const themeClasses = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-900 text-white',
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
}: VerseOptionsPanelProps) => {
  const [theme, setTheme] = useState('light');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const highlightColors = [
    { name: 'Amarillo', value: 'yellow', class: 'bg-yellow-200 dark:bg-yellow-400' },
    { name: 'Verde', value: 'green', class: 'bg-green-300 dark:bg-green-600' },
    { name: 'Azul', value: 'blue', class: 'bg-blue-300 dark:bg-blue-600' },
    { name: 'Rosa', value: 'pink', class: 'bg-pink-300 dark:bg-pink-600' },
    { name: 'Naranja', value: 'orange', class: 'bg-orange-300 dark:bg-orange-500' },
  ];

  useEffect(() => {
    const lectura = localStorage.getItem('theme-lectura');
    const global = localStorage.getItem('theme-global') || 'light';
    setTheme(lectura || global);
  }, []);

  const bgPanel = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textPanel = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const panel = (
    <div className="fixed bottom-0 left-0 w-full sm:left-1/2 sm:-translate-x-1/2 sm:max-w-lg z-[9999] bg-white shadow-2xl rounded-t-2xl flex flex-col items-center p-4 gap-3">
      <Card className="rounded-none border-0 shadow-none bg-background max-w-full w-full">
        <CardContent className="p-4 pb-3 max-w-full w-full">
          <div className="flex flex-nowrap justify-around gap-1 px-1 pb-1 w-full overflow-x-auto mb-8 relative">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowColorPicker((v) => !v)}
                className="flex flex-col items-center gap-1 h-auto py-2 min-w-[64px] rounded-xl shadow-sm transition-all duration-150 bg-biblical-gold/10 dark:bg-biblical-gold/20 text-biblical-gold dark:text-biblical-gold"
              >
                <Highlighter className="h-5 w-5" />
              </Button>
              {showColorPicker && (
                <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-[10000]">
                  <div className="bg-white rounded-2xl shadow-2xl p-4 flex gap-3">
                    {highlightColors.map((color) => (
                      <button
                        key={color.value}
                        className={`w-10 h-10 rounded-full border-2 border-gray-300 ${color.class} focus:ring-2 focus:ring-primary`}
                        onClick={() => {
                          onHighlight(color.value);
                          setShowColorPicker(false);
                        }}
                      >
                        <span className="sr-only">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              className="flex flex-col items-center gap-1 h-auto py-2 min-w-[64px] rounded-xl shadow-sm transition-all duration-150 bg-biblical-purple/10 dark:bg-biblical-purple/20 text-biblical-purple dark:text-biblical-purple"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddNote}
              className="flex flex-col items-center gap-1 h-auto py-2 min-w-[64px] rounded-xl shadow-sm transition-all duration-150 bg-biblical-blue/10 dark:bg-biblical-blue/20 text-biblical-blue dark:text-biblical-blue"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="flex flex-col items-center gap-1 h-auto py-2 min-w-[64px] rounded-xl shadow-sm transition-all duration-150 bg-biblical-green/10 dark:bg-biblical-green/20 text-biblical-green dark:text-biblical-green"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCreateImage}
              className="flex flex-col items-center gap-1 h-auto py-2 min-w-[64px] rounded-xl shadow-sm transition-all duration-150 bg-biblical-orange/10 dark:bg-biblical-orange/20 text-biblical-orange dark:text-biblical-orange"
            >
              <Image className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  return createPortal(panel, document.body);
};
