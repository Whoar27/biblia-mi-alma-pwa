import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Bookmark, 
  MessageCircle, 
  Highlighter, 
  Clock, 
  TrendingUp,
  Settings,
  Share2,
  Bell,
  Palette,
  Download,
  HelpCircle,
  Heart
} from "lucide-react";

interface UserActivity {
  type: 'saved' | 'comment' | 'highlight' | 'reading';
  title: string;
  description: string;
  date: string;
  count?: number;
}

const userActivities: UserActivity[] = [
  {
    type: 'saved',
    title: 'Versículos Guardados',
    description: 'Juan 3:16, Salmo 23:1, Filipenses 4:13...',
    date: 'Hoy',
    count: 24
  },
  {
    type: 'highlight',
    title: 'Versículos Resaltados',
    description: 'Últimos destacados en tus lecturas',
    date: 'Ayer',
    count: 12
  },
  {
    type: 'comment',
    title: 'Comentarios',
    description: 'Reflexiones sobre Romanos 8:28',
    date: 'Hace 2 días',
    count: 5
  },
  {
    type: 'reading',
    title: 'Tiempo de Lectura',
    description: 'Total esta semana: 3h 24min',
    date: 'Esta semana',
    count: 204
  }
];

const settingsOptions = [
  { icon: Bell, title: 'Notificaciones', description: 'Configura recordatorios de lectura' },
  { icon: Palette, title: 'Tema', description: 'Personaliza la apariencia' },
  { icon: Download, title: 'Descargas', description: 'Gestiona contenido offline' },
  { icon: Share2, title: 'Compartir', description: 'Comparte la app con amigos' },
  { icon: HelpCircle, title: 'Ayuda', description: 'Preguntas frecuentes y soporte' }
];

const THEME_OPTIONS = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'sepia', label: 'Sepia' },
];

export const EnhancedOptionsSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(() => localStorage.getItem('theme-global') || 'light');

  // Hook para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userProfile = {
    name: "María González",
    avatar: "/placeholder.svg",
    streak: 15,
    totalReadingTime: "24h 30min",
    completedPlans: 3
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'saved': return Bookmark;
      case 'comment': return MessageCircle;
      case 'highlight': return Highlighter;
      case 'reading': return Clock;
      default: return User;
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div>
      {/* Header específico para opciones */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <Settings className={`text-biblical-blue ${isScrolled ? 'h-5 w-5' : 'h-6 w-6'}`} />
            <h1 className={`font-bold ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              Opciones
            </h1>
          </div>
        </div>
      </header>

      {/* Contenido con padding superior para el header fijo */}
      <div className="pt-20 p-4 space-y-6">
        {/* Perfil del usuario */}
        <Card className="bg-gradient-to-br from-biblical-purple-light to-biblical-blue-light">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-biblical-gold text-black text-lg">
                    {getUserInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{userProfile.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Miembro desde enero 2024
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-biblical-orange text-white border-biblical-orange hover:bg-biblical-orange/90"
              >
                <Heart className="h-4 w-4 mr-2" />
                Donar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-biblical-purple">{userProfile.streak}</div>
                <div className="text-xs text-muted-foreground">Días de racha</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-biblical-blue">{userProfile.totalReadingTime}</div>
                <div className="text-xs text-muted-foreground">Tiempo total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-biblical-green">{userProfile.completedPlans}</div>
                <div className="text-xs text-muted-foreground">Planes completados</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actividad del usuario */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-biblical-purple" />
            <h3 className="text-lg font-semibold">Mi Actividad</h3>
          </div>
          <div className="space-y-3">
            {userActivities.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-biblical-purple-light">
                          <IconComponent className="h-4 w-4 text-biblical-purple" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.count && (
                          <Badge variant="secondary" className="text-xs mb-1">
                            {activity.count}
                          </Badge>
                        )}
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Configuraciones */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-biblical-blue" />
            <h3 className="text-lg font-semibold">Configuración</h3>
          </div>
          <div className="space-y-2">
            {/* Selector de tema visual */}
            <div className="p-4 border rounded-lg mb-2 flex items-center gap-4 bg-white dark:bg-gray-900">
              <Palette className="h-5 w-5 text-biblical-blue" />
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">Tema</h4>
                <div className="flex gap-2">
                  {THEME_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`px-3 py-1 rounded-full border text-sm transition-all
                        ${selectedTheme === opt.value
                          ? 'bg-biblical-blue text-white border-biblical-blue'
                          : 'bg-transparent text-biblical-blue border-biblical-blue/40 hover:bg-biblical-blue/10'}
                      `}
                      onClick={() => setSelectedTheme(opt.value)}
                      aria-pressed={selectedTheme === opt.value}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Fin selector de tema */}
            {settingsOptions.map((option, index) => {
              if(option.title === 'Tema') return null; // Ocultar opción previa de tema
              const IconComponent = option.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-biblical-blue" />
                      <div>
                        <h4 className="font-medium text-sm">{option.title}</h4>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
