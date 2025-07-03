
import { useState, useEffect } from 'react';

interface LastReadData {
  book: string;
  chapter: number;
  timestamp: number;
}

export const useLastRead = () => {
  const [lastRead, setLastRead] = useState<LastReadData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastReadChapter');
    if (saved) {
      try {
        setLastRead(JSON.parse(saved));
      } catch {
        setLastRead(null);
      }
    }
  }, []);

  const updateLastRead = (book: string, chapter: number) => {
    const data: LastReadData = {
      book,
      chapter,
      timestamp: Date.now()
    };
    setLastRead(data);
    localStorage.setItem('lastReadChapter', JSON.stringify(data));
  };

  return { lastRead, updateLastRead };
};
