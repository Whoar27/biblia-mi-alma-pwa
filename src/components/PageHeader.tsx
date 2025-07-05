import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Bell, TrendingUp, User, Search, Settings, Type, Palette, Share2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PageHeaderProps {
  page: 'home' | 'bible' | 'plans' | 'search' | 'options';
  onProfileClick?: () => void;
  onStatsClick?: () => void;
  userProfile?: {
    name: string;
    avatar?: string;
    streak: number;
  };
  // Props específicos para la página de Biblia
  currentBook?: string;
  currentChapter?: number;
  selectedVersion?: string;
  onBookChapterClick?: () => void;
  onVersionClick?: () => void;
}

export const PageHeader = ({ 
  page, 
  onProfileClick, 
  onStatsClick, 
  userProfile,
  currentBook,
  currentChapter,
  selectedVersion,
  onBookChapterClick,
  onVersionClick
}: PageHeaderProps) => {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('theme-global') || 'light');

  // Detectar scroll para reducir el header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotifications = () => {
    toast({
      title: "Notificaciones",
      description: "No tienes notificaciones pendientes"
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      toast({
        title: "Buscando...",
        description: `Buscando "${searchTerm}" en ${currentBook} ${currentChapter}`
      });
    }
    setShowSearch(false);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    localStorage.setItem('theme-global', theme);
    setShowThemes(false);
  };

  const handleShareChapter = () => {
    const chapterText = `${currentBook} ${currentChapter} - Biblia ${selectedVersion}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${currentBook} ${currentChapter}`,
        text: chapterText,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(chapterText);
        toast({
          title: "Copiado",
          description: "El enlace del capítulo fue copiado al portapapeles"
        });
      });
    } else {
      navigator.clipboard.writeText(chapterText);
      toast({
        title: "Copiado",
        description: "El enlace del capítulo fue copiado al portapapeles"
      });
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Header para la página de inicio
  if (page === 'home') {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-biblical-purple to-biblical-blue text-white shadow-lg transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onStatsClick}
            className="text-white hover:bg-white/10 flex items-center gap-2"
          >
            <TrendingUp className="h-5 w-5" />
            <div className="flex flex-col items-start">
              <span className="text-xs opacity-80">Racha</span>
              <span className="font-bold">{userProfile?.streak || 0} días</span>
            </div>
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotifications}
              className="text-white hover:bg-white/10 relative"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-biblical-orange border-0">
                3
              </Badge>
            </Button>

            <Button
              variant="ghost"
              onClick={onProfileClick}
              className="text-white hover:bg-white/10 p-1"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile?.avatar} />
                <AvatarFallback className="bg-biblical-gold text-black text-xs">
                  {userProfile?.name ? getUserInitials(userProfile.name) : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Header para la página de Biblia con funcionalidades completas
  if (page === 'bible') {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-biblical-purple to-biblical-blue text-white shadow-lg transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2">
            {currentBook && (
              <>
                <Button
                  variant="ghost"
                  onClick={onBookChapterClick}
                  className="text-white hover:bg-white/10 bg-white/10 flex items-center gap-1"
                >
                  {currentChapter === 0 && <AlertCircle className="h-4 w-4 text-biblical-orange" />}
                  {currentBook} {currentChapter > 0 ? currentChapter : 'Introducción'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={onVersionClick}
                  className="text-white hover:bg-white/10 bg-white/10"
                >
                  {selectedVersion}
                </Button>
              </>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
              className="text-white hover:bg-white/10"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:bg-white/10"
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowThemes(!showThemes)}
              className="text-white hover:bg-white/10"
            >
              <Palette className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareChapter}
              className="text-white hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Panel de búsqueda */}
        {showSearch && (
          <div className="mt-2 mx-4 p-3 bg-white/10 rounded-lg">
            <div className="flex gap-2">
              <Input
                placeholder="Buscar en este capítulo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                Buscar
              </Button>
            </div>
          </div>
        )}

        {/* Panel de configuración de texto */}
        {showSettings && (
          <div className="mt-2 mx-4 p-3 bg-white/10 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-sm font-medium">Tamaño: {fontSize[0]}px</span>
              </div>
              <div className="w-32">
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={12}
                  max={24}
                  step={1}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Versión:</span>
              <Select value={selectedVersion} onValueChange={(value) => console.log('Version changed:', value)}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RVR1960">RVR1960</SelectItem>
                  <SelectItem value="NVI">NVI</SelectItem>
                  <SelectItem value="RVA2015">RVA2015</SelectItem>
                  <SelectItem value="LBLA">LBLA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Panel de temas */}
        {showThemes && (
          <div className="mt-2 mx-4 p-3 bg-white/10 rounded-lg">
            {['light', 'dark', 'sepia'].map((theme) => (
              <Button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`bg-white text-black hover:bg-gray-100 ${selectedTheme === theme ? 'ring-2 ring-white' : ''}`}
              >
                {theme === 'light' ? 'Claro' : theme === 'dark' ? 'Oscuro' : 'Sepia'}
              </Button>
            ))}
          </div>
        )}
      </header>
    );
  }

  // Header simplificado para otras páginas
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-biblical-purple to-biblical-blue text-white shadow-lg transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2">
          {page === 'bible' && currentBook && (
            <>
              <Button
                variant="ghost"
                onClick={onBookChapterClick}
                className="text-white hover:bg-white/10 bg-white/10"
              >
                {currentBook} {currentChapter}
              </Button>
              <Button
                variant="ghost"
                onClick={onVersionClick}
                className="text-white hover:bg-white/10 bg-white/10"
              >
                {selectedVersion}
              </Button>
            </>
          )}
        </div>
        
        <div className="flex gap-2">          
          {page === 'options' && (
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 bg-biblical-orange"
            >
              Donar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
