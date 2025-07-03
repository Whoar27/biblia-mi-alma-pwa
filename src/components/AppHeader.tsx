
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, TrendingUp, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppHeaderProps {
  onProfileClick: () => void;
  onStatsClick: () => void;
  userProfile?: {
    name: string;
    avatar?: string;
    streak: number;
  };
}

export const AppHeader = ({ onProfileClick, onStatsClick, userProfile }: AppHeaderProps) => {
  const { toast } = useToast();

  const handleNotifications = () => {
    toast({
      title: "Notificaciones",
      description: "No tienes notificaciones pendientes"
    });
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="bg-gradient-to-r from-biblical-purple to-biblical-blue text-white p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
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
};
