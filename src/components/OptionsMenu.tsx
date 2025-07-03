
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, 
  Moon, 
  Sun, 
  Type, 
  Volume2, 
  Bell, 
  Download,
  Share2,
  Heart,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const OptionsMenu = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState([16]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exportando datos",
      description: "Tus favoritos y progreso se están exportando..."
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi Alma Biblia',
        text: 'Descubre esta increíble app para leer la Biblia',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Enlace copiado",
        description: "El enlace de la app fue copiado al portapapeles"
      });
    }
  };

  const settingsGroups = [
    {
      title: "Apariencia",
      settings: [
        {
          id: "darkMode",
          label: "Modo oscuro",
          description: "Cambia entre tema claro y oscuro",
          icon: darkMode ? Moon : Sun,
          component: (
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          )
        },
        {
          id: "fontSize",
          label: "Tamaño de fuente",
          description: `Tamaño actual: ${fontSize[0]}px`,
          icon: Type,
          component: (
            <div className="w-32">
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>
          )
        }
      ]
    },
    {
      title: "Notificaciones",
      settings: [
        {
          id: "notifications",
          label: "Recordatorios diarios",
          description: "Recibe recordatorios para leer la Biblia",
          icon: Bell,
          component: (
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          )
        },
        {
          id: "audio",
          label: "Audio habilitado",
          description: "Habilita la reproducción de audio",
          icon: Volume2,
          component: (
            <Switch
              checked={audioEnabled}
              onCheckedChange={setAudioEnabled}
            />
          )
        }
      ]
    }
  ];

  const actionButtons = [
    {
      id: "favorites",
      label: "Mis Favoritos",
      description: "Ver todos tus versículos favoritos",
      icon: Heart,
      color: "text-red-500",
      action: () => toast({ title: "Navegando a favoritos", description: "Mostrando tus versículos favoritos" })
    },
    {
      id: "export",
      label: "Exportar Datos",
      description: "Guarda tu progreso y favoritos",
      icon: Download,
      color: "text-blue-500",
      action: handleExport
    },
    {
      id: "share",
      label: "Compartir App",
      description: "Comparte esta app con otros",
      icon: Share2,
      color: "text-green-500",
      action: handleShare
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <Settings className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Configuración</h2>
        <p className="text-muted-foreground">
          Personaliza tu experiencia de lectura
        </p>
      </div>

      {settingsGroups.map((group) => (
        <Card key={group.title}>
          <CardHeader>
            <CardTitle className="text-lg">{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {group.settings.map((setting) => {
              const Icon = setting.icon;
              return (
                <div key={setting.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  {setting.component}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actionButtons.map((button) => {
            const Icon = button.icon;
            return (
              <Button
                key={button.id}
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={button.action}
              >
                <Icon className={`h-5 w-5 mr-3 ${button.color}`} />
                <div className="text-left">
                  <p className="font-medium">{button.label}</p>
                  <p className="text-sm text-muted-foreground">{button.description}</p>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Mi Alma Biblia</h3>
            <p className="text-sm text-muted-foreground mb-4">Versión 1.0.0</p>
            <p className="text-xs text-muted-foreground">
              Creada con amor para fortalecer tu vida espiritual
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
